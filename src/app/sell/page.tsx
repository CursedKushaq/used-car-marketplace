import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  Zap,
  PhoneOff,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sell Your Used Car Online in India",
  description:
    "Sell your car to verified buyers across India with zero spam calls, instant fair price valuation, and automated paperwork guidance.",
};

export default function SellLandingPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-12">
      {/* ── Hero Section ───────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
          <Zap className="w-4 h-4" />
          <span>Direct Seller Platform &bull; Zero Commission for Private Sellers</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ink">
          Sell your car from your phone in{" "}
          <span className="text-primary underline decoration-primary/30">10 minutes</span>
        </h1>

        <p className="text-sm sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          List directly to serious buyers with complete price transparency. Keep your phone number private until buyers verify with an OTP.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/sell/new">
            <Button size="lg" className="w-full sm:w-auto px-8 gap-2">
              <span>Start Listing Your Car</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/how-price-ratings-work">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              How Valuation Works
            </Button>
          </Link>
        </div>
      </section>

      {/* ── 3 Big Seller Advantages ────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-3">
            <div className="p-3 rounded-2xl bg-orange-100 text-orange-800 w-fit">
              <PhoneOff className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-ink">Zero Spam Calls</h3>
            <p className="text-xs text-muted leading-relaxed">
              Your real contact details are strictly masked. Buyers must enter an OTP and agree to DPDP-compliant inquiry terms before seeing your contact info.
            </p>
          </div>

          <div className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-3">
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 w-fit">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-ink">Higher Realization</h3>
            <p className="text-xs text-muted leading-relaxed">
              No middleman cuts or wholesale dealer margins. Price ratings prove to buyers that your asking price is fair compared to local listings.
            </p>
          </div>

          <div className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-3">
            <div className="p-3 rounded-2xl bg-teal-100 text-teal-800 w-fit">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-ink">Guided Legal Paperwork</h3>
            <p className="text-xs text-muted leading-relaxed">
              Automated assistance with Parivahan Form 29 &amp; 30, NOC clearance checklist, and insurance transfer guidance so you stay legally protected.
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works Steps ─────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
            How Selling on AutoBazaar Works
          </h2>
          <p className="text-xs sm:text-sm text-muted">
            Simple, honest 4-step process from photo upload to handover
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Enter Vehicle Details",
              desc: "Provide variant, year, kilometres, and condition declarations.",
            },
            {
              step: "02",
              title: "Guided Photos",
              desc: "Snap 6+ photos following our guided corner and dashboard slots.",
            },
            {
              step: "03",
              title: "Check Valuation",
              desc: "See what similar cars ask in your city and set your price.",
            },
            {
              step: "04",
              title: "Meet Verified Buyers",
              desc: "Receive serious OTP-verified enquiries and close the deal.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-2 relative"
            >
              <span className="text-2xl font-black text-primary/30 font-tabular block">
                {item.step}
              </span>
              <h4 className="font-bold text-sm text-ink">{item.title}</h4>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link href="/sell/new">
            <Button size="lg" className="px-8">
              Start Free Listing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
