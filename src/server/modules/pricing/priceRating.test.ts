import { describe, it, expect } from "vitest";
import { calculatePriceRating } from "./priceRating";

describe("calculatePriceRating", () => {
  const comps = [500000, 510000, 520000, 530000, 540000]; // median is 520,000

  it("identifies below_market (Great Price) when priced >= 5% below median", () => {
    // 470,000 is ~9.6% below median 520,000
    const result = calculatePriceRating(470000, comps);
    expect(result.rating).toBe("below_market");
    expect(result.label).toBe("Great Price");
    expect(result.badgeVariant).toBe("success");
    expect(result.compsCount).toBe(5);
    expect(result.medianInr).toBe(520000);
    expect(result.differenceInr).toBe(-50000);
  });

  it("identifies in_line (Fair Price) when priced within 5% of median", () => {
    // 515,000 is -0.96% below median 520,000
    const result = calculatePriceRating(515000, comps);
    expect(result.rating).toBe("in_line");
    expect(result.label).toBe("Fair Price");
    expect(result.badgeVariant).toBe("muted");
  });

  it("identifies above_market when priced >= 5% above median", () => {
    // 560,000 is ~7.7% above median 520,000
    const result = calculatePriceRating(560000, comps);
    expect(result.rating).toBe("above_market");
    expect(result.label).toBe("Above Market");
    expect(result.badgeVariant).toBe("warning");
  });

  it("returns insufficient_data when comps are below threshold", () => {
    const result = calculatePriceRating(500000, [510000, 520000]);
    expect(result.rating).toBe("insufficient_data");
    expect(result.label).toBe("Needs more data");
    expect(result.compsCount).toBe(2);
  });
});
