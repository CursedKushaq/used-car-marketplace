import React from "react";
import type { SellerProfile } from "@/server/modules/catalog/types";
import { Building2, User, Clock, Star, CheckCircle, ShieldCheck } from "lucide-react";

interface DealerScorecardViewProps {
  seller: SellerProfile;
}

export const DealerScorecardView: React.FC<DealerScorecardViewProps> = ({
  seller,
}) => {
  const isDealer = seller.type !== "individual";

  return (
    <div className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-4">
      <div className="flex items-start justify-between gap-4 border-b border-muted/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-canvas border border-muted/15 text-primary">
            {isDealer ? (
              <Building2 className="w-6 h-6" />
            ) : (
              <User className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-ink text-base">{seller.name}</h3>
              {isDealer && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Dealer
                </span>
              )}
            </div>
            <p className="text-xs text-muted mt-0.5">
              {seller.locality}, {seller.city} &bull; Member since {seller.verifiedSinceYear}
            </p>
          </div>
        </div>

        {seller.rating && (
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 rounded-xl px-2.5 py-1">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className="font-bold text-xs text-amber-900">{seller.rating}</span>
            <span className="text-[11px] text-amber-700 font-medium">
              ({seller.reviewCount})
            </span>
          </div>
        )}
      </div>

      {/* Scorecard Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center sm:text-left">
        <div className="p-3 rounded-xl bg-canvas border border-muted/10 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-medium text-muted">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>Response Time</span>
          </div>
          <p className="text-sm font-bold text-ink">
            ~{seller.medianResponseHours} {seller.medianResponseHours === 1 ? "hour" : "hours"}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-canvas border border-muted/10 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-medium text-muted">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Listing Accuracy</span>
          </div>
          <p className="text-sm font-bold text-emerald-700">
            {seller.accuracyScorePercent}% Verified
          </p>
        </div>

        <div className="p-3 rounded-xl bg-canvas border border-muted/10 space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-1 text-[11px] font-medium text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>Contact Privacy</span>
          </div>
          <p className="text-sm font-bold text-ink">
            Masked until OTP
          </p>
        </div>
      </div>
    </div>
  );
};
