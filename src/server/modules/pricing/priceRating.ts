/**
 * Price Rating Engine (v0.1)
 *
 * Compares a listing's asking price against the median asking price of comparable vehicles
 * (same variant/model, within ±1-2 years, similar km band and region).
 *
 * Ratings:
 * - below_market: Asking price is ≥ 5% below median ("Great Price")
 * - in_line: Asking price is within ±5% of median ("Fair Price")
 * - above_market: Asking price is > 5% above median ("Above Market")
 * - insufficient_data: Fewer than 3 comps available
 */

export type PriceRatingLevel =
  | "below_market"
  | "in_line"
  | "above_market"
  | "insufficient_data";

export interface PriceRatingResult {
  rating: PriceRatingLevel;
  label: string;
  badgeVariant: "success" | "muted" | "warning";
  compsCount: number;
  medianInr: number;
  differenceInr: number;
  differencePercent: number;
  methodVersion: string;
  summary: string;
}

export const MINIMUM_COMPS_THRESHOLD = 3;
export const PRICE_DEVIATION_BAND = 0.05; // 5%

export function calculatePriceRating(
  askingPriceInr: number,
  comparablePricesInr: number[],
  options?: { minComps?: number; deviationBand?: number; version?: string }
): PriceRatingResult {
  const minComps = options?.minComps ?? MINIMUM_COMPS_THRESHOLD;
  const deviationBand = options?.deviationBand ?? PRICE_DEVIATION_BAND;
  const methodVersion = options?.version ?? "v0.1";

  if (!comparablePricesInr || comparablePricesInr.length < minComps) {
    return {
      rating: "insufficient_data",
      label: "Needs more data",
      badgeVariant: "muted",
      compsCount: comparablePricesInr ? comparablePricesInr.length : 0,
      medianInr: 0,
      differenceInr: 0,
      differencePercent: 0,
      methodVersion,
      summary: "Not enough similar listings in this region to calculate an objective market benchmark.",
    };
  }

  // Calculate median
  const sorted = [...comparablePricesInr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const medianInr =
    sorted.length % 2 !== 0
      ? sorted[mid]
      : Math.round((sorted[mid - 1] + sorted[mid]) / 2);

  const differenceInr = askingPriceInr - medianInr;
  const differencePercent = (differenceInr / medianInr) * 100;

  if (differencePercent <= -deviationBand * 100) {
    const savings = Math.abs(differenceInr);
    return {
      rating: "below_market",
      label: "Great Price",
      badgeVariant: "success",
      compsCount: sorted.length,
      medianInr,
      differenceInr,
      differencePercent: Number(differencePercent.toFixed(1)),
      methodVersion,
      summary: `Priced ₹${Math.abs(Math.round(savings / 1000))}k (${Math.abs(Number(differencePercent.toFixed(1)))}%) below similar listings.`,
    };
  }

  if (differencePercent >= deviationBand * 100) {
    return {
      rating: "above_market",
      label: "Above Market",
      badgeVariant: "warning",
      compsCount: sorted.length,
      medianInr,
      differenceInr,
      differencePercent: Number(differencePercent.toFixed(1)),
      methodVersion,
      summary: `Priced ₹${Math.abs(Math.round(differenceInr / 1000))}k (${Math.abs(Number(differencePercent.toFixed(1)))}%) above similar listings.`,
    };
  }

  return {
    rating: "in_line",
    label: "Fair Price",
    badgeVariant: "muted",
    compsCount: sorted.length,
    medianInr,
    differenceInr,
    differencePercent: Number(differencePercent.toFixed(1)),
    methodVersion,
    summary: "In line with current asking prices of similar listings.",
  };
}
