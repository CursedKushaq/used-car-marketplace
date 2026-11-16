import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatPriceCompact,
  formatKm,
  formatOwnership,
  maskRegistrationNumber,
  formatRelativeTime,
} from "./format";

describe("formatCurrency", () => {
  it("formats positive numbers with INR symbol and Indian comma placement", () => {
    const formatted = formatCurrency(485000);
    // en-IN currency formats as ₹4,85,000 (allowing for non-breaking spaces)
    expect(formatted).toContain("₹");
    expect(formatted).toContain("4,85,000");
  });

  it("handles edge cases and invalid values", () => {
    expect(formatCurrency(0)).toContain("0");
    expect(formatCurrency(NaN)).toBe("₹0");
  });
});

describe("formatPriceCompact", () => {
  it("formats amounts in lakhs properly", () => {
    expect(formatPriceCompact(485000)).toBe("₹4.85 Lakh");
    expect(formatPriceCompact(1200000)).toBe("₹12 Lakh");
    expect(formatPriceCompact(1250000)).toBe("₹12.5 Lakh");
  });

  it("formats amounts under 1 lakh with standard currency", () => {
    const result = formatPriceCompact(75000);
    expect(result).toContain("₹");
    expect(result).toContain("75,000");
  });

  it("formats amounts in crores properly", () => {
    expect(formatPriceCompact(12500000)).toBe("₹1.25 Cr");
    expect(formatPriceCompact(20000000)).toBe("₹2 Cr");
  });
});

describe("formatKm", () => {
  it("formats kilometres with km suffix and commas", () => {
    expect(formatKm(42000)).toBe("42,000 km");
    expect(formatKm(115400)).toBe("1,15,400 km");
    expect(formatKm(0)).toBe("0 km");
  });
});

describe("formatOwnership", () => {
  it("formats ownership ordinals", () => {
    expect(formatOwnership(1)).toBe("1st Owner");
    expect(formatOwnership(2)).toBe("2nd Owner");
    expect(formatOwnership(3)).toBe("3rd Owner");
    expect(formatOwnership(4)).toBe("4th Owner");
  });
});

describe("maskRegistrationNumber", () => {
  it("masks state registration number keeping RTO and last 4 digits", () => {
    expect(maskRegistrationNumber("DL01AB1234")).toBe("DL 01 •• 1234");
    expect(maskRegistrationNumber("MH12DE5678")).toBe("MH 12 •• 5678");
  });

  it("handles missing values", () => {
    expect(maskRegistrationNumber(null)).toBe("Not Disclosed");
  });
});

describe("formatRelativeTime", () => {
  it("formats recent timestamps", () => {
    const now = new Date();
    expect(formatRelativeTime(now)).toBe("Just now");

    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    expect(formatRelativeTime(twoHoursAgo)).toBe("2h ago");
  });
});
