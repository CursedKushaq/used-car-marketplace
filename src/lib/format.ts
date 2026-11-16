/**
 * Indian Number Formatting and Currency Helpers
 * Follows en-IN formatting standard (lakhs & crores) and WCAG tabular figures rules.
 */

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrNumberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

/**
 * Format full currency string, e.g. 485000 -> "₹4,85,000"
 */
export function formatCurrency(amount: number): string {
  if (typeof amount !== "number" || isNaN(amount)) return "₹0";
  return inrFormatter.format(amount);
}

/**
 * Format compact Indian price representation:
 * Under 1 Lakh -> ₹85,000
 * 1 Lakh to 99 Lakhs -> ₹4.85 Lakh
 * 1 Crore+ -> ₹1.25 Cr
 */
export function formatPriceCompact(amount: number): string {
  if (typeof amount !== "number" || isNaN(amount)) return "₹0";

  if (amount >= 10_000_000) {
    const cr = amount / 10_000_000;
    const formatted = parseFloat(cr.toFixed(2));
    return `₹${formatted} Cr`;
  }

  if (amount >= 100_000) {
    const lakh = amount / 100_000;
    const formatted = parseFloat(lakh.toFixed(2));
    return `₹${formatted} Lakh`;
  }

  return formatCurrency(amount);
}

/**
 * Format kilometre reading, e.g. 42000 -> "42,000 km"
 */
export function formatKm(km: number): string {
  if (typeof km !== "number" || isNaN(km)) return "0 km";
  return `${inrNumberFormatter.format(km)} km`;
}

/**
 * Format owner count string, e.g. 1 -> "1st Owner", 2 -> "2nd Owner"
 */
export function formatOwnership(owners: number): string {
  switch (owners) {
    case 1:
      return "1st Owner";
    case 2:
      return "2nd Owner";
    case 3:
      return "3rd Owner";
    default:
      return `${owners}th Owner`;
  }
}

/**
 * Masks registration number for privacy on public listings:
 * e.g. "DL01AB1234" -> "DL 01 •• 1234"
 */
export function maskRegistrationNumber(reg?: string | null): string {
  if (!reg) return "Not Disclosed";
  const clean = reg.replace(/\s+/g, "").toUpperCase();
  if (clean.length < 8) return clean;
  const stateRto = clean.slice(0, 4);
  const lastFour = clean.slice(-4);
  return `${stateRto.slice(0, 2)} ${stateRto.slice(2, 4)} •• ${lastFour}`;
}

/**
 * Formats relative time (e.g. "2 days ago", "Just now")
 */
export function formatRelativeTime(dateInput: Date | string | number): string {
  const date = new Date(dateInput);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays}d ago`;
  
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}
