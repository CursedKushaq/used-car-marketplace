"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { formatPriceCompact } from "@/lib/format";

export const FilterChips: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const chips: { key: string; value: string; label: string }[] = [];

  const query = searchParams.get("q");
  if (query) {
    chips.push({ key: "q", value: query, label: `Search: "${query}"` });
  }

  const city = searchParams.get("city");
  if (city && city !== "all") {
    chips.push({ key: "city", value: city, label: `City: ${city}` });
  }

  searchParams.getAll("make").forEach((m) => {
    chips.push({ key: "make", value: m, label: m });
  });

  searchParams.getAll("bodyType").forEach((b) => {
    chips.push({ key: "bodyType", value: b, label: b.toUpperCase() });
  });

  searchParams.getAll("fuel").forEach((f) => {
    chips.push({ key: "fuel", value: f, label: f.charAt(0).toUpperCase() + f.slice(1) });
  });

  searchParams.getAll("transmission").forEach((t) => {
    chips.push({ key: "transmission", value: t, label: t.charAt(0).toUpperCase() + t.slice(1) });
  });

  searchParams.getAll("verificationLevel").forEach((v) => {
    chips.push({
      key: "verificationLevel",
      value: v,
      label: v === "partner_checked" ? "Partner Inspected" : "Document Verified",
    });
  });

  searchParams.getAll("priceRating").forEach((r) => {
    chips.push({
      key: "priceRating",
      value: r,
      label: r === "below_market" ? "Great Price" : "Fair Price",
    });
  });

  const budgetMin = searchParams.get("budgetMin");
  const budgetMax = searchParams.get("budgetMax");
  if (budgetMin || budgetMax) {
    const minVal = budgetMin ? Number(budgetMin) : 0;
    const maxVal = budgetMax ? Number(budgetMax) : 3000000;
    chips.push({
      key: "budget",
      value: "budget",
      label: `${formatPriceCompact(minVal)} - ${formatPriceCompact(maxVal)}`,
    });
  }

  if (chips.length === 0) return null;

  const removeChip = (chipKey: string, chipValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (chipKey === "budget") {
      params.delete("budgetMin");
      params.delete("budgetMax");
    } else {
      const values = params.getAll(chipKey).filter((v) => v !== chipValue);
      params.delete(chipKey);
      values.forEach((v) => params.append(chipKey, v));
    }

    router.push(`/used-cars?${params.toString()}`);
  };

  const clearAll = () => {
    router.push("/used-cars");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      <span className="text-xs font-semibold text-muted">Applied Filters:</span>

      {chips.map((chip, idx) => (
        <span
          key={`${chip.key}-${chip.value}-${idx}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => removeChip(chip.key, chip.value)}
            className="rounded-full p-0.5 hover:bg-primary/10 text-primary cursor-pointer"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={clearAll}
        className="text-xs font-semibold text-muted hover:text-danger underline underline-offset-2 ml-1 cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
};
