"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { CarListing } from "@/server/modules/catalog/types";
import { formatCurrency, formatPriceCompact, formatKm, formatOwnership } from "@/lib/format";
import { PriceRatingBadge } from "../listing/PriceRatingBadge";
import { VerificationLadderBadge } from "../listing/VerificationLadderBadge";
import { useCompare, MAX_COMPARE_CARS } from "./CompareContext";
import { Button } from "../ui/Button";
import { X, Check, Minus, Plus, ArrowLeft } from "lucide-react";

interface ComparisonViewProps {
  cars: CarListing[];
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ cars }) => {
  const { removeFromCompare } = useCompare();
  const [diffOnly, setDiffOnly] = useState(false);

  if (cars.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-ink">No cars selected for comparison</h2>
        <p className="text-sm text-muted">
          Browse our verified inventory and click the &ldquo;Compare&rdquo; checkbox on up to {MAX_COMPARE_CARS} vehicles to view them side-by-side.
        </p>
        <Link href="/used-cars">
          <Button className="mt-2">Browse Used Cars</Button>
        </Link>
      </div>
    );
  }

  // Row definition helper
  const renderRow = (
    label: string,
    getValue: (car: CarListing) => React.ReactNode,
    isDifferent: boolean = true
  ) => {
    if (diffOnly && !isDifferent) return null;

    return (
      <tr className="border-b border-muted/10 hover:bg-canvas/50 transition-colors">
        <td className="p-3.5 text-xs font-bold text-muted bg-surface/50 w-44 sticky left-0 z-10">
          {label}
        </td>
        {cars.map((car) => (
          <td key={car.id} className="p-3.5 text-xs font-medium text-ink min-w-[200px]">
            {getValue(car)}
          </td>
        ))}
      </tr>
    );
  };

  const areValuesDifferent = (extractor: (c: CarListing) => any) => {
    const first = extractor(cars[0]);
    return cars.some((c) => extractor(c) !== first);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-muted/15 pb-4">
        <div>
          <Link
            href="/used-cars"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to search</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
            Compare Vehicles
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Side-by-side comparison of {cars.length} vehicles
          </p>
        </div>

        {/* Show differences only switch */}
        <label className="flex items-center gap-2 text-xs font-semibold text-ink cursor-pointer select-none bg-canvas border border-muted/20 px-3.5 py-2 rounded-xl">
          <input
            type="checkbox"
            checked={diffOnly}
            onChange={(e) => setDiffOnly(e.target.checked)}
            className="rounded border-muted/30 text-primary focus:ring-primary h-4 w-4"
          />
          <span>Show Differences Only</span>
        </label>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-muted/20 bg-surface shadow-xs">
        <table className="w-full text-left border-collapse">
          {/* Sticky Vehicle Header Row */}
          <thead>
            <tr className="border-b border-muted/15 bg-canvas/70">
              <th className="p-4 w-44 text-xs font-bold text-muted sticky left-0 z-20 bg-canvas">
                Vehicle Details
              </th>
              {cars.map((car) => (
                <th key={car.id} className="p-4 min-w-[220px] align-top">
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-canvas">
                      <img
                        src={car.photos[0]?.url}
                        alt={car.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFromCompare(car.id)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white text-muted hover:text-danger shadow-xs"
                        aria-label={`Remove ${car.title}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <Link
                        href={`/car/${car.slug}-${car.id}`}
                        className="font-bold text-sm text-ink hover:text-primary transition-colors block line-clamp-1"
                      >
                        {car.title}
                      </Link>
                      <span className="text-lg font-black text-ink font-tabular mt-1 block">
                        {formatPriceCompact(car.priceInr)}
                      </span>
                    </div>

                    <Link href={`/car/${car.slug}-${car.id}`}>
                      <Button size="sm" variant="outline" className="w-full text-xs">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* ── Price & Ratings Group ──────────────────── */}
            <tr className="bg-canvas/30 font-bold text-xs uppercase text-primary border-b border-muted/10">
              <td colSpan={cars.length + 1} className="px-4 py-2">
                Pricing &amp; Market Benchmark
              </td>
            </tr>
            {renderRow("Asking Price", (c) => formatCurrency(c.priceInr), areValuesDifferent((c) => c.priceInr))}
            {renderRow("Market Benchmark", (c) => (
              <PriceRatingBadge priceRating={c.priceRating} askingPriceInr={c.priceInr} />
            ))}
            {renderRow("Negotiable", (c) => (c.negotiable ? "Yes" : "Fixed Price"))}

            {/* ── Key Specs Group ────────────────────────── */}
            <tr className="bg-canvas/30 font-bold text-xs uppercase text-primary border-b border-muted/10">
              <td colSpan={cars.length + 1} className="px-4 py-2">
                Key Specifications
              </td>
            </tr>
            {renderRow("Manufacturing Year", (c) => c.year, areValuesDifferent((c) => c.year))}
            {renderRow("Kilometres Driven", (c) => formatKm(c.km), areValuesDifferent((c) => c.km))}
            {renderRow("Fuel Type", (c) => <span className="capitalize">{c.fuel}</span>, areValuesDifferent((c) => c.fuel))}
            {renderRow("Transmission", (c) => <span className="capitalize">{c.transmission}</span>, areValuesDifferent((c) => c.transmission))}
            {renderRow("Engine Capacity", (c) => `${c.engineCc} cc`, areValuesDifferent((c) => c.engineCc))}
            {renderRow("Max Power", (c) => `${c.powerPs} PS`, areValuesDifferent((c) => c.powerPs))}
            {renderRow("Seating Capacity", (c) => `${c.seats} Seater`, areValuesDifferent((c) => c.seats))}
            {renderRow("Color", (c) => c.color, areValuesDifferent((c) => c.color))}

            {/* ── Ownership & Verification Group ─────────── */}
            <tr className="bg-canvas/30 font-bold text-xs uppercase text-primary border-b border-muted/10">
              <td colSpan={cars.length + 1} className="px-4 py-2">
                Ownership &amp; Legal
              </td>
            </tr>
            {renderRow("Ownership", (c) => formatOwnership(c.owners), areValuesDifferent((c) => c.owners))}
            {renderRow("RTO State", (c) => `${c.registrationState} (${c.paperwork.rtoCode})`, areValuesDifferent((c) => c.registrationState))}
            {renderRow("RC Status", (c) => c.paperwork.rcStatus)}
            {renderRow("Insurance Validity", (c) => c.paperwork.insuranceValidity)}
            {renderRow("Loan Hypothecation", (c) => c.paperwork.hypothecationStatus)}
            {renderRow("Verification Level", (c) => (
              <VerificationLadderBadge summary={c.verificationLadder} />
            ))}
            {renderRow("Inspection Score", (c) => (c.inspection ? `${c.inspection.score}/10` : "Self Declared"))}

            {/* ── Key Features ───────────────────────────── */}
            <tr className="bg-canvas/30 font-bold text-xs uppercase text-primary border-b border-muted/10">
              <td colSpan={cars.length + 1} className="px-4 py-2">
                Equipment &amp; Features
              </td>
            </tr>
            {[
              "Sunroof",
              "Touchscreen",
              "Apple CarPlay",
              "Ventilated Seats",
              "Camera",
              "Alloy Wheels",
              "Cruise Control",
            ].map((featureName) => {
              const hasFeature = (c: CarListing) =>
                c.features.some((f) => f.toLowerCase().includes(featureName.toLowerCase()));

              return renderRow(
                featureName,
                (c) =>
                  hasFeature(c) ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Minus className="w-4 h-4 text-muted/40" />
                  ),
                areValuesDifferent(hasFeature)
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
