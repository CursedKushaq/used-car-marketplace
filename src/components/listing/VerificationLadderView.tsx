import React from "react";
import type { VerificationLadderSummary } from "@/server/modules/verification/verificationLadder";
import { CHECK_METADATA } from "@/server/modules/verification/verificationLadder";
import { ShieldCheck, CheckCircle, AlertCircle, Info } from "lucide-react";

interface VerificationLadderViewProps {
  summary: VerificationLadderSummary;
}

export const VerificationLadderView: React.FC<VerificationLadderViewProps> = ({
  summary,
}) => {
  const getLevelBadge = (level: string) => {
    switch (level) {
      case "partner_checked":
        return {
          icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
          label: "Partner Checked",
          classes: "bg-emerald-50 text-emerald-800 border-emerald-200",
        };
      case "document_seen":
        return {
          icon: <CheckCircle className="w-4 h-4 text-teal-600" />,
          label: "Document Seen",
          classes: "bg-teal-50 text-teal-800 border-teal-200",
        };
      default:
        return {
          icon: <AlertCircle className="w-4 h-4 text-amber-600" />,
          label: "Self Declared",
          classes: "bg-amber-50 text-amber-800 border-amber-200",
        };
    }
  };

  return (
    <div className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-muted/10 pb-4">
        <div>
          <h3 className="font-bold text-ink text-base">5-Point Verification Ladder</h3>
          <p className="text-xs text-muted mt-0.5">
            Transparent evidentiary levels for all critical vehicle aspects
          </p>
        </div>
        <div className="flex items-center gap-2 bg-canvas border border-muted/20 rounded-xl px-3 py-1.5 self-start sm:self-auto">
          <span className="text-xs text-muted font-medium">Overall Status:</span>
          <span className="text-xs font-bold text-primary">{summary.badgeLabel}</span>
        </div>
      </div>

      <div className="space-y-3">
        {summary.checks.map((check) => {
          const badge = getLevelBadge(check.level);
          const meta = CHECK_METADATA[check.item];
          return (
            <div
              key={check.item}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-canvas border border-muted/10 gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0">{badge.icon}</span>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-ink">{check.title}</h4>
                  <p className="text-[11px] text-muted">{meta?.description}</p>
                  <p className="text-[11px] text-ink font-medium mt-1">
                    Evidence source: <span className="text-muted">{check.source}</span>
                  </p>
                </div>
              </div>

              <div className="self-end sm:self-center shrink-0">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${badge.classes}`}
                >
                  {badge.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
