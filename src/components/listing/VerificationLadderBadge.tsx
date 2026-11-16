"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { VerificationLadderSummary } from "@/server/modules/verification/verificationLadder";
import { ShieldCheck, CheckCircle, Clock, AlertCircle, X, ShieldAlert } from "lucide-react";
import { Badge } from "../ui/Badge";

interface VerificationLadderBadgeProps {
  summary: VerificationLadderSummary;
}

export const VerificationLadderBadge: React.FC<VerificationLadderBadgeProps> = ({
  summary,
}) => {
  const [showModal, setShowModal] = useState(false);

  const getBadgeIcon = () => {
    switch (summary.overallLevel) {
      case "partner_checked":
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />;
      case "document_seen":
        return <CheckCircle className="w-3.5 h-3.5 text-teal-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "partner_checked":
        return <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />;
      case "document_seen":
        return <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />;
      default:
        return <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />;
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "partner_checked":
        return "Partner Inspected";
      case "document_seen":
        return "Document Verified";
      default:
        return "Self Declared";
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
        title="Click to view 5-Point Verification Ladder details"
      >
        <Badge
          variant={summary.badgeVariant}
          className="hover:shadow-xs transition-shadow"
        >
          {getBadgeIcon()}
          <span>{summary.badgeLabel}</span>
        </Badge>
      </button>

      {/* Verification Ladder Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="verification-ladder-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-surface p-6 shadow-2xl border border-muted/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-muted/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-canvas">{getBadgeIcon()}</span>
                <div>
                  <h3 id="verification-ladder-title" className="font-bold text-ink text-base">
                    Verification Ladder: {summary.badgeLabel}
                  </h3>
                  <p className="text-xs text-muted">
                    Trust Score: {summary.score}/100 &bull; Transparent Verification
                  </p>
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
              <p className="text-xs text-muted leading-relaxed">
                Rather than one vague &ldquo;certified&rdquo; sticker, our Verification Ladder shows the exact evidentiary level for every critical safety and ownership item.
              </p>

              <div className="space-y-2.5">
                {summary.checks.map((check) => (
                  <div
                    key={check.item}
                    className="flex items-start justify-between p-3 rounded-xl bg-canvas border border-muted/10 gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      {getLevelIcon(check.level)}
                      <div>
                        <h4 className="text-xs font-bold text-ink">{check.title}</h4>
                        <p className="text-[11px] text-muted mt-0.5">
                          Evidence: {check.source}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border shrink-0 ${
                        check.level === "partner_checked"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : check.level === "document_seen"
                          ? "bg-teal-50 text-teal-800 border-teal-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {getLevelLabel(check.level)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-muted/10">
              <Link
                href="/how-we-verify"
                className="text-xs font-semibold text-primary hover:underline"
                onClick={() => setShowModal(false)}
              >
                Learn how our verification ladder works &rarr;
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
