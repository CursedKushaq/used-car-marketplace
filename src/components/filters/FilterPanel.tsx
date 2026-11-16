"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { SearchResults } from "@/server/modules/catalog/types";
import { formatPriceCompact } from "@/lib/format";
import { BODY_TYPES, MAJOR_INDIAN_CITIES } from "@/server/modules/catalog/data";
import { Button } from "../ui/Button";
import { Filter, X, RotateCcw } from "lucide-react";

interface FilterPanelProps {
  facets: SearchResults["facets"];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  facets,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current filters from URL
  const selectedMakes = searchParams.getAll("make");
  const selectedBodyTypes = searchParams.getAll("bodyType");
  const selectedFuels = searchParams.getAll("fuel");
  const selectedTransmissions = searchParams.getAll("transmission");
  const selectedOwners = searchParams.getAll("owners").map(Number);
  const selectedVerification = searchParams.getAll("verificationLevel");
  const selectedPriceRating = searchParams.getAll("priceRating");

  const initialBudgetMin = searchParams.get("budgetMin")
    ? Number(searchParams.get("budgetMin"))
    : 0;
  const initialBudgetMax = searchParams.get("budgetMax")
    ? Number(searchParams.get("budgetMax"))
    : 3000000;

  const [budgetMin, setBudgetMin] = useState<number>(initialBudgetMin);
  const [budgetMax, setBudgetMax] = useState<number>(initialBudgetMax);

  // Helper to update query params
  const updateQuery = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete("page"); // reset page on filter change
    values.forEach((v) => params.append(key, v));
    router.push(`/used-cars?${params.toString()}`);
  };

  const toggleArrayValue = (key: string, current: string[], val: string) => {
    const updated = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    updateQuery(key, updated);
  };

  const applyBudget = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    if (budgetMin > 0) params.set("budgetMin", budgetMin.toString());
    else params.delete("budgetMin");
    if (budgetMax < 3000000) params.set("budgetMax", budgetMax.toString());
    else params.delete("budgetMax");
    router.push(`/used-cars?${params.toString()}`);
  };

  const handleReset = () => {
    setBudgetMin(0);
    setBudgetMax(3000000);
    router.push("/used-cars");
    if (onCloseMobile) onCloseMobile();
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-muted/15">
        <div className="flex items-center gap-2 font-bold text-ink text-base">
          <Filter className="w-4 h-4 text-primary" />
          <span>Filters</span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-muted hover:text-ink flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* ── Budget Filter (with Typed Inputs for WCAG 2.2 AA) ── */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-ink">Budget Range (₹)</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label htmlFor="budget-min" className="text-muted block mb-1">
              Min (₹)
            </label>
            <input
              id="budget-min"
              type="number"
              step="50000"
              min="0"
              max="5000000"
              value={budgetMin}
              onChange={(e) => setBudgetMin(Number(e.target.value))}
              onBlur={applyBudget}
              aria-label="Minimum budget in rupees"
              className="w-full rounded-xl border border-muted/20 bg-surface px-3 py-2 text-xs font-medium text-ink focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="budget-max" className="text-muted block mb-1">
              Max (₹)
            </label>
            <input
              id="budget-max"
              type="number"
              step="50000"
              min="100000"
              max="5000000"
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              onBlur={applyBudget}
              aria-label="Maximum budget in rupees"
              className="w-full rounded-xl border border-muted/20 bg-surface px-3 py-2 text-xs font-medium text-ink focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Dual Range slider visual */}
        <input
          type="range"
          min="100000"
          max="3000000"
          step="50000"
          value={budgetMax}
          onChange={(e) => setBudgetMax(Number(e.target.value))}
          onMouseUp={applyBudget}
          onTouchEnd={applyBudget}
          aria-label="Budget range slider"
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-muted">
          <span>{formatPriceCompact(budgetMin)}</span>
          <span>{formatPriceCompact(budgetMax)}</span>
        </div>
      </div>

      {/* ── Make Facets ──────────────────────────────── */}
      <div className="space-y-3 pt-4 border-t border-muted/15">
        <h4 className="text-sm font-bold text-ink">Brand / Make</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {facets.makes.map((make) => {
            const checked = selectedMakes.includes(make.value);
            return (
              <label
                key={make.value}
                className="flex items-center justify-between text-xs cursor-pointer select-none text-ink hover:text-primary py-0.5"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      toggleArrayValue("make", selectedMakes, make.value)
                    }
                    className="rounded border-muted/30 text-primary focus:ring-primary h-3.5 w-3.5 cursor-pointer"
                  />
                  <span>{make.label}</span>
                </div>
                <span className="text-[11px] text-muted font-tabular">
                  ({make.count})
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── Body Type Chips ──────────────────────────── */}
      <div className="space-y-3 pt-4 border-t border-muted/15">
        <h4 className="text-sm font-bold text-ink">Body Type</h4>
        <div className="flex flex-wrap gap-1.5">
          {BODY_TYPES.map((type) => {
            const active = selectedBodyTypes.includes(type.id);
            return (
              <button
                key={type.id}
                type="button"
                onClick={() =>
                  toggleArrayValue("bodyType", selectedBodyTypes, type.id)
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  active
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-surface text-ink border-muted/20 hover:border-muted/40"
                }`}
              >
                {type.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Fuel Type Chips ──────────────────────────── */}
      <div className="space-y-3 pt-4 border-t border-muted/15">
        <h4 className="text-sm font-bold text-ink">Fuel</h4>
        <div className="flex flex-wrap gap-1.5">
          {["petrol", "diesel", "cng", "electric", "hybrid"].map((fuel) => {
            const active = selectedFuels.includes(fuel);
            return (
              <button
                key={fuel}
                type="button"
                onClick={() => toggleArrayValue("fuel", selectedFuels, fuel)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize border transition-all ${
                  active
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-surface text-ink border-muted/20 hover:border-muted/40"
                }`}
              >
                {fuel}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Transmission Segmented Control ────────────── */}
      <div className="space-y-3 pt-4 border-t border-muted/15">
        <h4 className="text-sm font-bold text-ink">Transmission</h4>
        <div className="grid grid-cols-2 gap-2">
          {["manual", "automatic"].map((trans) => {
            const active = selectedTransmissions.includes(trans);
            return (
              <button
                key={trans}
                type="button"
                onClick={() =>
                  toggleArrayValue("transmission", selectedTransmissions, trans)
                }
                className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all text-center ${
                  active
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-surface text-ink border-muted/20 hover:border-muted/40"
                }`}
              >
                {trans}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Verification Level ────────────────────────── */}
      <div className="space-y-3 pt-4 border-t border-muted/15">
        <h4 className="text-sm font-bold text-ink">Verification Level</h4>
        <div className="space-y-2">
          {[
            { id: "partner_checked", label: "Partner Inspected" },
            { id: "document_seen", label: "RC & Documents Seen" },
            { id: "declared", label: "Self Declared" },
          ].map((level) => {
            const checked = selectedVerification.includes(level.id);
            return (
              <label
                key={level.id}
                className="flex items-center gap-2 text-xs cursor-pointer select-none text-ink hover:text-primary py-0.5"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    toggleArrayValue(
                      "verificationLevel",
                      selectedVerification,
                      level.id
                    )
                  }
                  className="rounded border-muted/30 text-primary focus:ring-primary h-3.5 w-3.5 cursor-pointer"
                />
                <span>{level.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── Price Rating ─────────────────────────────── */}
      <div className="space-y-3 pt-4 border-t border-muted/15">
        <h4 className="text-sm font-bold text-ink">Price Rating</h4>
        <div className="space-y-2">
          {[
            { id: "below_market", label: "Great Price (Below Similar Listings)" },
            { id: "in_line", label: "Fair Price (In Line with Market)" },
            { id: "above_market", label: "Above Market" },
          ].map((rating) => {
            const checked = selectedPriceRating.includes(rating.id);
            return (
              <label
                key={rating.id}
                className="flex items-center gap-2 text-xs cursor-pointer select-none text-ink hover:text-primary py-0.5"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    toggleArrayValue("priceRating", selectedPriceRating, rating.id)
                  }
                  className="rounded border-muted/30 text-primary focus:ring-primary h-3.5 w-3.5 cursor-pointer"
                />
                <span>{rating.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Rail */}
      <aside className="hidden lg:block w-72 shrink-0 rounded-2xl border border-muted/20 bg-surface p-5 shadow-xs sticky top-20 self-start">
        {content}
      </aside>

      {/* Mobile Bottom-sheet Modal */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in">
          <div
            className="w-full max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface p-6 shadow-2xl animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-muted/15 mb-4">
              <h3 className="font-bold text-ink text-lg">Filters</h3>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-muted hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
            <div className="mt-6 pt-4 border-t border-muted/15">
              <Button onClick={onCloseMobile} className="w-full">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
