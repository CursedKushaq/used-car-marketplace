import React from "react";
import type { PaperworkDetails } from "@/server/modules/catalog/types";
import { FileCheck, Shield, Award, AlertCircle } from "lucide-react";

interface PaperworkChecklistViewProps {
  paperwork: PaperworkDetails;
}

export const PaperworkChecklistView: React.FC<PaperworkChecklistViewProps> = ({
  paperwork,
}) => {
  return (
    <div className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-4">
      <div className="flex items-center gap-2.5 border-b border-muted/10 pb-4">
        <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
          <FileCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-ink text-base">
            Paperwork &amp; Legal Verification
          </h3>
          <p className="text-xs text-muted">
            All key registration, insurance, and hypothecation documents inspected
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* RC */}
        <div className="p-3.5 rounded-xl bg-canvas border border-muted/10 space-y-1">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            Registration Certificate (RC)
          </span>
          <p className="text-xs font-bold text-ink">{paperwork.rcStatus}</p>
          <p className="text-[11px] text-muted">Registered RTO: {paperwork.rtoCode}</p>
        </div>

        {/* Insurance */}
        <div className="p-3.5 rounded-xl bg-canvas border border-muted/10 space-y-1">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            Insurance Policy
          </span>
          <p className="text-xs font-bold text-ink">{paperwork.insuranceType}</p>
          <p className="text-[11px] text-muted">
            Valid until: <strong className="text-ink">{paperwork.insuranceValidity}</strong>
          </p>
        </div>

        {/* PUC */}
        <div className="p-3.5 rounded-xl bg-canvas border border-muted/10 space-y-1">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            Pollution Certificate (PUC)
          </span>
          <p className="text-xs font-bold text-ink">Active &amp; Compliant</p>
          <p className="text-[11px] text-muted">
            Valid until: <strong className="text-ink">{paperwork.pucValidity}</strong>
          </p>
        </div>

        {/* Hypothecation */}
        <div className="p-3.5 rounded-xl bg-canvas border border-muted/10 space-y-1">
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            Loan Hypothecation (HP)
          </span>
          <p className="text-xs font-bold text-ink">{paperwork.hypothecationStatus}</p>
          <p className="text-[11px] text-muted">Clear title ready for RC ownership transfer</p>
        </div>
      </div>
    </div>
  );
};
