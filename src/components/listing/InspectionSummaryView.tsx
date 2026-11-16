import React from "react";
import type { InspectionReport } from "@/server/modules/catalog/types";
import { CheckCircle2, AlertCircle, Wrench, ShieldCheck, UserCheck } from "lucide-react";

interface InspectionSummaryViewProps {
  inspection?: InspectionReport;
}

export const InspectionSummaryView: React.FC<InspectionSummaryViewProps> = ({
  inspection,
}) => {
  if (!inspection) {
    return (
      <div className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-3">
        <div className="flex items-center gap-2 text-ink font-bold text-base">
          <Wrench className="w-5 h-5 text-muted" />
          <span>Physical Inspection Report</span>
        </div>
        <p className="text-xs text-muted leading-relaxed">
          This vehicle is currently listed with self-declared seller condition. A certified 160-point inspection can be requested during your viewing appointment.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-muted/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-ink text-base">
              Certified 160-Point Inspection Report
            </h3>
            <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Inspected by {inspection.inspectorName} on {inspection.inspectedAt}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 rounded-xl px-3 py-1.5 self-start sm:self-auto">
          <span className="text-xs text-emerald-800 font-medium">Health Score:</span>
          <span className="text-base font-bold text-emerald-700 font-tabular">
            {inspection.score} / 10
          </span>
        </div>
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {inspection.systems.map((system) => {
          const isPass = system.status === "pass";
          return (
            <div
              key={system.name}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-canvas border border-muted/10"
            >
              {isPass ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-ink">{system.name}</h4>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      isPass
                        ? "bg-emerald-100/70 text-emerald-800"
                        : "bg-amber-100/70 text-amber-800"
                    }`}
                  >
                    {isPass ? "Passed" : "Imperfection"}
                  </span>
                </div>
                <p className="text-[11px] text-muted leading-relaxed">
                  {system.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
