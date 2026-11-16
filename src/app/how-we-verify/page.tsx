import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Clock,
  Wrench,
  Search,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How AutoBazaar Verifies Used Cars",
  description:
    "Learn about our transparent 5-Point Verification Ladder. Unlike vague certified stickers, AutoBazaar breaks down every evidentiary check.",
};

export default function HowWeVerifyPage() {
  const pillars = [
    {
      title: "1. Seller Identity & KYC",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      desc: "Every seller's phone number is verified via automated SMS OTP. Dealerships must provide their valid GST registration, business trade license, and physical showroom address.",
      levels: [
        { level: "Self Declared", text: "Phone OTP verified at registration." },
        { level: "Document Seen", text: "Aadhaar / Gov-ID verified on file." },
        { level: "Partner Checked", text: "Physical dealership audited on-site." },
      ],
    },
    {
      title: "2. Registration & RC Ownership",
      icon: <FileCheck className="w-6 h-6 text-primary" />,
      desc: "We verify the vehicle's Registration Certificate against Parivahan / Vahan government records, ensuring valid road tax, correct owner count, and zero hypothecation or blacklisting blocks.",
      levels: [
        { level: "Self Declared", text: "Owner inputs RTO registration number." },
        { level: "Document Seen", text: "Original Smart Card RC photo verified." },
        { level: "Partner Checked", text: "Direct Parivahan API record match." },
      ],
    },
    {
      title: "3. Insurance Policy Status",
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      desc: "We verify active Comprehensive or Third-Party insurance policies, expiry dates, and No-Claim-Bonus (NCB) percentages to ensure uninterrupted legal roadworthiness.",
      levels: [
        { level: "Self Declared", text: "Seller inputs policy expiry date." },
        { level: "Document Seen", text: "Valid policy certificate PDF reviewed." },
        { level: "Partner Checked", text: "Direct insurance portal validation." },
      ],
    },
    {
      title: "4. Odometer Integrity Check",
      icon: <Clock className="w-6 h-6 text-primary" />,
      desc: "Odometer tampering is a major scam in India. We cross-reference the vehicle's current kilometre reading against manufacturer authorized service center service records.",
      levels: [
        { level: "Self Declared", text: "Cluster photo submitted by seller." },
        { level: "Document Seen", text: "Stamped service booklet inspected." },
        { level: "Partner Checked", text: "OEM authorized digital service history." },
      ],
    },
    {
      title: "5. 160-Point Physical Inspection",
      icon: <Wrench className="w-6 h-6 text-primary" />,
      desc: "Certified automotive engineers assess the vehicle across 160 checkpoints covering engine compression, transmission shifting, frame geometry, flood marks, paint thickness, and tyre tread.",
      levels: [
        { level: "Self Declared", text: "Seller declaration checklist." },
        { level: "Document Seen", text: "Third-party garage check report." },
        { level: "Partner Checked", text: "AutoBazaar certified 160-point audit." },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
          Transparency Standard
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-ink tracking-tight">
          The 5-Point Verification Ladder
        </h1>
        <p className="text-sm sm:text-base text-muted leading-relaxed">
          Most used car portals slap a generic &ldquo;Certified&rdquo; badge on cars without explaining what was checked. AutoBazaar grades each item across three clear evidentiary tiers so you can make informed decisions.
        </p>
      </div>

      {/* Pillars List */}
      <div className="space-y-6">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-muted/15 bg-surface p-6 sm:p-8 space-y-4 shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-primary/10">{p.icon}</div>
              <h2 className="text-xl font-bold text-ink">{p.title}</h2>
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">{p.desc}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {p.levels.map((lvl) => (
                <div
                  key={lvl.level}
                  className="p-3.5 rounded-xl bg-canvas border border-muted/10 space-y-1"
                >
                  <span className="text-[11px] font-bold text-primary uppercase">
                    {lvl.level}
                  </span>
                  <p className="text-xs text-ink">{lvl.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl bg-surface border border-muted/20 p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-ink">Ready to browse verified cars?</h3>
        <p className="text-xs text-muted max-w-md mx-auto">
          Explore our current stock with active verification badges and full 160-point inspection reports.
        </p>
        <Link href="/used-cars">
          <Button size="md" className="gap-2">
            <span>Browse Verified Inventory</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
