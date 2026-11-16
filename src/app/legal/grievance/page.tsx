import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grievance Redressal Mechanism — AutoBazaar",
  description:
    "Statutory Grievance Redressal details under the IT Intermediary Guidelines and Digital Personal Data Protection Act.",
};

export default function GrievancePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-ink">
      <div className="border-b border-muted/15 pb-6 space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-ink">
          Grievance Redressal Mechanism
        </h1>
        <p className="text-xs text-muted">
          Designated Statutory Officer details under Rule 3(2) of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and Section 13 of the DPDP Act, 2023.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-muted leading-relaxed">
        <p>
          If you have any grievance or concern regarding content listed on AutoBazaar, suspected fraudulent sellers, copyright infringement, or personal data rights under the DPDP Act, you may lodge a complaint with our Grievance Officer:
        </p>

        <div className="p-6 rounded-2xl bg-surface border border-muted/20 space-y-3">
          <h2 className="text-base font-bold text-ink">Grievance Officer</h2>
          <div className="space-y-1.5 text-xs text-ink font-medium">
            <p><strong>Name:</strong> Mr. S. K. Narayanan</p>
            <p><strong>Designation:</strong> Head of Trust, Safety &amp; Legal Compliance</p>
            <p><strong>Entity:</strong> AutoBazaar Technologies India Pvt. Ltd.</p>
            <p><strong>Registered Address:</strong> Level 5, Barakhamba Road, Connaught Place, New Delhi 110001, India</p>
            <p><strong>Email:</strong> grievance-officer@autobazaar.in</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-ink">Redressal Timelines:</h3>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Acknowledgment:</strong> All tickets acknowledged within 24 to 48 hours with a unique ticket tracking number.</li>
            <li><strong>Resolution:</strong> Thoroughly investigated and disposed of within fifteen (15) days of receipt.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
