import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice (DPDP Act 2025/2027) — AutoBazaar",
  description:
    "Comprehensive privacy notice compliant with India's Digital Personal Data Protection Act (DPDP Act 2023 & DPDP Rules 2025/2027).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-ink">
      <div className="border-b border-muted/15 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
          Compliance Notice
        </span>
        <h1 className="text-3xl font-black tracking-tight text-ink">
          Privacy Notice &amp; Data Rights
        </h1>
        <p className="text-xs text-muted">
          Last updated: November 16, 2026 &bull; Compliant with Digital Personal Data Protection Act (DPDP), 2023 and DPDP Rules, 2025/2027
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink">1. Data Fiduciary Identity</h2>
          <p>
            AutoBazaar Technologies India Private Limited (&ldquo;AutoBazaar&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates as a Data Fiduciary under the provisions of the Digital Personal Data Protection Act, 2023. Our registered office is located in New Delhi, India.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink">2. Categories of Data Collected</h2>
          <p>We process only data essential to facilitate used-car marketplace interactions:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Identity &amp; Contact:</strong> Full name, mobile number (verified via OTP), and optional email address.</li>
            <li><strong>Vehicle Registration Details:</strong> Registration number, vehicle identification number (VIN/Chassis), RTO location, manufacturing year, and odometer readings. Note: Public listings display only masked registration numbers.</li>
            <li><strong>Consent Ledger:</strong> Cryptographically logged timestamps of specific consents granted for phone OTP verification and seller lead sharing.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink">3. Specified Purposes for Processing</h2>
          <p>
            In strict compliance with Section 6 of the DPDP Act, personal data is processed solely for specified, lawful purposes for which explicit, informed consent has been obtained:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Routing vehicle enquiries from verified prospective buyers to listing sellers.</li>
            <li>Validating vehicle ownership and hypothecation status against official registry databases.</li>
            <li>Detecting and preventing fraudulent listings, unauthorized spam, and meter tampering.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink">4. Data Principal Rights</h2>
          <p>Under the DPDP Act, you have unequivocal rights regarding your personal data:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><strong>Right to Access:</strong> Summary of your personal data processed and third-party identities with whom data was shared.</li>
            <li><strong>Right to Correction &amp; Erasure:</strong> You may request deletion of your account and purge of personal contact details from our active databases.</li>
            <li><strong>Right of Grievance Redressal:</strong> Dedicated redressal via our designated Grievance Officer within statutory timelines.</li>
            <li><strong>Right to Nominate:</strong> Nominate an individual to exercise your data rights in the event of death or incapacity.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink">5. Grievance Officer Contact Details</h2>
          <div className="p-4 rounded-xl bg-canvas border border-muted/15 space-y-1 text-xs">
            <p className="font-bold text-ink">Designated Grievance Officer:</p>
            <p className="text-ink">Mr. S. K. Narayanan</p>
            <p className="text-muted">AutoBazaar Technologies India Pvt. Ltd.</p>
            <p className="text-muted">Email: grievance-officer@autobazaar.in</p>
            <p className="text-muted">Response timeline: Within 48 hours for acknowledgment; resolution within statutory periods.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
