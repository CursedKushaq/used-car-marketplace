/**
 * Verification Ladder Engine
 *
 * Provides a structured 5-point verification model with 3 clear tiers:
 * - declared (Self-declared by seller)
 * - document_seen (Platform verified against physical or digital document)
 * - partner_checked (Independently certified by inspection partner or RTO API)
 */

export type VerificationCheckItem =
  | "identity"
  | "ownership"
  | "insurance"
  | "odometer"
  | "inspection";

export type VerificationLevel = "declared" | "document_seen" | "partner_checked";

export interface VerificationCheck {
  item: VerificationCheckItem;
  title: string;
  level: VerificationLevel;
  source: string;
  checkedAt?: string;
  notes?: string;
}

export interface VerificationLadderSummary {
  overallLevel: VerificationLevel;
  badgeLabel: string;
  badgeVariant: "success" | "primary" | "muted";
  score: number; // 0 to 100
  checks: VerificationCheck[];
  summary: string;
}

const CHECK_WEIGHTS: Record<VerificationCheckItem, number> = {
  ownership: 30,
  inspection: 25,
  odometer: 20,
  insurance: 15,
  identity: 10,
};

const LEVEL_MULTIPLIERS: Record<VerificationLevel, number> = {
  declared: 0.3,
  document_seen: 0.8,
  partner_checked: 1.0,
};

export const CHECK_METADATA: Record<
  VerificationCheckItem,
  { title: string; description: string }
> = {
  identity: {
    title: "Seller Identity",
    description: "Verified via phone OTP, Gov-ID, or registered dealership credentials.",
  },
  ownership: {
    title: "Registration & RC Status",
    description: "Vahan / RTO verification, chassis/engine number consistency, and loan hypothecation check.",
  },
  insurance: {
    title: "Insurance Validity",
    description: "Inspection of comprehensive or third-party insurance policy and validity date.",
  },
  odometer: {
    title: "Odometer Integrity",
    description: "Cross-checked with authorized service network records for mileage rollback anomalies.",
  },
  inspection: {
    title: "Physical Inspection",
    description: "Comprehensive 160-point mechanical, structural, and electrical health assessment.",
  },
};

export function evaluateVerificationLadder(
  checks: VerificationCheck[]
): VerificationLadderSummary {
  let score = 0;
  const checkMap = new Map<VerificationCheckItem, VerificationCheck>();

  for (const check of checks) {
    checkMap.set(check.item, check);
    const weight = CHECK_WEIGHTS[check.item] || 0;
    const mult = LEVEL_MULTIPLIERS[check.level] || 0;
    score += weight * mult;
  }

  score = Math.round(score);

  const ownershipCheck = checkMap.get("ownership");
  const inspectionCheck = checkMap.get("inspection");

  let overallLevel: VerificationLevel = "declared";
  let badgeLabel = "Self Declared";
  let badgeVariant: "success" | "primary" | "muted" = "muted";

  if (
    inspectionCheck?.level === "partner_checked" &&
    ownershipCheck &&
    (ownershipCheck.level === "document_seen" || ownershipCheck.level === "partner_checked")
  ) {
    overallLevel = "partner_checked";
    badgeLabel = "Partner Inspected";
    badgeVariant = "success";
  } else if (
    ownershipCheck &&
    (ownershipCheck.level === "document_seen" || ownershipCheck.level === "partner_checked")
  ) {
    overallLevel = "document_seen";
    badgeLabel = "RC Verified";
    badgeVariant = "primary";
  }

  return {
    overallLevel,
    badgeLabel,
    badgeVariant,
    score,
    checks,
    summary:
      overallLevel === "partner_checked"
        ? "Fully certified with 160-point on-ground inspection and verified paperwork."
        : overallLevel === "document_seen"
        ? "Key registration and ownership documents reviewed and validated."
        : "Initial seller declarations provided. Request document verification upon viewing.",
  };
}
