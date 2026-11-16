"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { PriceRatingResult } from "@/server/modules/pricing/priceRating";
import { formatCurrency } from "@/lib/format";
import { Info, X, TrendingDown, CheckCircle2, TrendingUp } from "lucide-react";
import { Badge } from "../ui/Badge";

interface PriceRatingBadgeProps {
  priceRating: PriceRatingResult;
  askingPriceInr: number;
}

export const PriceRatingBadge: React.FC<PriceRatingBadgeProps> = ({
  priceRating,
  askingPriceInr,
}) => {
  const [showModal, setShowModal] = useState(false);

  const getIcon = () => {
    switch (priceRating.rating) {
      case "below_market":
        return <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />;
      case "in_line":
        return <CheckCircle2 className="w-3.5 h-3.5 text-gray-600" />;
      case "above_market":
        return <TrendingUp className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Info className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
        className="inline-flex items-center gap-1 group cursor-pointer focus:outline-none"
        title="Click to see market price comparison workings"
      >
        <Badge
          variant={priceRating.badgeVariant}
          className="hover:shadow-xs transition-shadow"
        >
          {getIcon()}
          <span>{priceRating.label}</span>
          <Info className="w-3 h-3 text-muted/70 group-hover:text-ink transition-colors ml-0.5" />
        </Badge>
      </button>

      {/* Explainer Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="price-rating-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl border border-muted/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-muted/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-canvas">{getIcon()}</span>
                <div>
                  <h3 id="price-rating-title" className="font-bold text-ink text-base">
                    Price Rating: {priceRating.label}
                  </h3>
                  <p className="text-xs text-muted">Method {priceRating.methodVersion}</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-muted hover:text-ink p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-5 space-y-4">
              <p className="text-sm text-ink leading-relaxed font-medium">
                {priceRating.summary}
              </p>

              <div className="rounded-xl bg-canvas p-4 border border-muted/10 space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted">Asking Price:</span>
                  <span className="font-bold text-ink">{formatCurrency(askingPriceInr)}</span>
                </div>
                {priceRating.medianInr > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted">Median Comparable Price:</span>
                    <span className="font-semibold text-ink">
                      {formatCurrency(priceRating.medianInr)}
                    </span>
                  </div>
                )}
                {priceRating.compsCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted">Comparison Pool:</span>
                    <span className="font-medium text-ink">
                      {priceRating.compsCount} similar active listings
                    </span>
                  </div>
                )}
                {priceRating.differenceInr !== 0 && (
                  <div className="flex justify-between items-center pt-2 border-t border-muted/15">
                    <span className="text-muted font-medium">Market Difference:</span>
                    <span
                      className={`font-bold ${
                        priceRating.differenceInr < 0
                          ? "text-emerald-700"
                          : "text-amber-700"
                      }`}
                    >
                      {priceRating.differenceInr < 0 ? "-" : "+"}
                      {formatCurrency(Math.abs(priceRating.differenceInr))} (
                      {Math.abs(priceRating.differencePercent)}%)
                    </span>
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-amber-50/70 border border-amber-200/60 p-3 text-xs text-amber-900 leading-relaxed">
                <span className="font-semibold">Honest Disclosure:</span> This rating is computed by clustering current asking prices of similar vehicles in this city and age bracket. It compares asking prices, not closed transaction prices.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-muted/10">
              <Link
                href="/how-price-ratings-work"
                className="text-xs font-semibold text-primary hover:underline"
                onClick={() => setShowModal(false)}
              >
                Read full pricing methodology &rarr;
              </Link>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-xs font-semibold text-muted hover:text-ink"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
