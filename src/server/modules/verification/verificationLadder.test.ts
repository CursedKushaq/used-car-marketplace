import { describe, it, expect } from "vitest";
import {
  evaluateVerificationLadder,
  type VerificationCheck,
} from "./verificationLadder";

describe("evaluateVerificationLadder", () => {
  it("rates as partner_checked when inspection is partner_checked and RC is document_seen", () => {
    const checks: VerificationCheck[] = [
      { item: "identity", title: "Identity", level: "document_seen", source: "Aadhaar KYC" },
      { item: "ownership", title: "RC Status", level: "document_seen", source: "Parivahan RTO" },
      { item: "insurance", title: "Insurance", level: "document_seen", source: "Policy PDF" },
      { item: "odometer", title: "Odometer", level: "partner_checked", source: "Service Log" },
      { item: "inspection", title: "Inspection", level: "partner_checked", source: "AutoBazaar 160-Point" },
    ];

    const result = evaluateVerificationLadder(checks);
    expect(result.overallLevel).toBe("partner_checked");
    expect(result.badgeLabel).toBe("Partner Inspected");
    expect(result.badgeVariant).toBe("success");
    expect(result.score).toBeGreaterThanOrEqual(85);
  });

  it("rates as document_seen when RC is seen but full inspection is not done", () => {
    const checks: VerificationCheck[] = [
      { item: "identity", title: "Identity", level: "declared", source: "OTP" },
      { item: "ownership", title: "RC Status", level: "document_seen", source: "RC Photo" },
      { item: "insurance", title: "Insurance", level: "declared", source: "Self" },
      { item: "odometer", title: "Odometer", level: "declared", source: "Self" },
      { item: "inspection", title: "Inspection", level: "declared", source: "Self" },
    ];

    const result = evaluateVerificationLadder(checks);
    expect(result.overallLevel).toBe("document_seen");
    expect(result.badgeLabel).toBe("RC Verified");
    expect(result.badgeVariant).toBe("primary");
  });

  it("rates as declared when all checks are self-declared", () => {
    const checks: VerificationCheck[] = [
      { item: "identity", title: "Identity", level: "declared", source: "OTP" },
      { item: "ownership", title: "RC Status", level: "declared", source: "Self" },
      { item: "insurance", title: "Insurance", level: "declared", source: "Self" },
      { item: "odometer", title: "Odometer", level: "declared", source: "Self" },
      { item: "inspection", title: "Inspection", level: "declared", source: "Self" },
    ];

    const result = evaluateVerificationLadder(checks);
    expect(result.overallLevel).toBe("declared");
    expect(result.badgeLabel).toBe("Self Declared");
    expect(result.badgeVariant).toBe("muted");
    expect(result.score).toBeLessThan(40);
  });
});
