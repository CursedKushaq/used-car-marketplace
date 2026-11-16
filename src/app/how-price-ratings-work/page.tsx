import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingDown,
  CheckCircle2,
  TrendingUp,
  Scale,
  ShieldAlert,
  ArrowRight,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How Our Price Ratings Work — AutoBazaar",
  description:
    "Transparent documentation of AutoBazaar's Price Rating algorithm (v0.1). Learn how comparison pools, asking-price medians, and deviation bands are calculated.",
};

export default function HowPriceRatingsWorkPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
          Algorithmic Transparency
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-ink tracking-tight">
          How AutoBazaar Calculates Price Ratings
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
          We believe price ratings must be mathematical, reproducible, and completely divorced from commercial relationships. Paid dealer subscriptions can never upgrade a car&apos;s price rating.
        </p>
      </div>

      {/* 3 Rating Tiers Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 font-bold">
            <TrendingDown className="w-5 h-5 text-emerald-600" />
            <span>Great Price</span>
          </div>
          <p className="text-xs text-emerald-900 leading-relaxed">
            The asking price is <strong>&ge; 5% below the median</strong> asking price of comparable vehicles in this market. Represents exceptional value.
          </p>
        </div>

        <div className="rounded-2xl border border-muted/20 bg-surface p-6 space-y-3">
          <div className="flex items-center gap-2 text-ink font-bold">
            <CheckCircle2 className="w-5 h-5 text-muted" />
            <span>Fair Price</span>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            The asking price is <strong>within &plusmn;5% of the median</strong> comparable price. Aligns with current market expectations.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-6 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <span>Above Market</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            The asking price is <strong>&gt; 5% above the median</strong> comparable price. May be justified by rare trim, VIP plate, or factory warranty.
          </p>
        </div>
      </div>

      {/* Algorithm Step-by-Step */}
      <div className="rounded-2xl border border-muted/20 bg-surface p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-ink">The Calculation Process (v0.1)</h2>

        <div className="space-y-4 text-xs sm:text-sm text-muted leading-relaxed">
          <div className="p-4 rounded-xl bg-canvas border border-muted/10 space-y-1">
            <h4 className="font-bold text-ink">1. Clustering the Comparison Pool</h4>
            <p>
              To compare like with like, our algorithm filters active listings by:
            </p>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-xs">
              <li>Exact Make, Model, and Variant (e.g. Maruti Swift ZXi+)</li>
              <li>Manufacturing Year within &plusmn;1 year</li>
              <li>Kilometre band (within &plusmn;15,000 km)</li>
              <li>Region / State (e.g. Delhi NCR, Maharashtra, Karnataka)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-canvas border border-muted/10 space-y-1">
            <h4 className="font-bold text-ink">2. Sample Size Safeguard</h4>
            <p>
              A minimum of <strong>3 verified comparable vehicles</strong> is required to compute a rating. If fewer comps exist, we label the vehicle as &ldquo;Needs more data&rdquo; rather than showing a misleading guess.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-canvas border border-muted/10 space-y-1">
            <h4 className="font-bold text-ink">3. Median Benchmarking</h4>
            <p>
              We use the <strong>median</strong> instead of the average (mean) asking price to ensure that an extreme outlier or overpriced listing does not skew the rating.
            </p>
          </div>
        </div>
      </div>

      {/* Crucial Honest Disclosure */}
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-950 font-bold text-base">
          <ShieldAlert className="w-5 h-5 text-amber-700" />
          <span>Important Limitations &amp; Disclosures</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          Our price ratings compare <strong>asking prices</strong> of live listings, not final closed cash transaction prices (which are private between buyer and seller). A &ldquo;Great Price&rdquo; rating does not substitute for a physical test drive and document inspection.
        </p>
      </div>

      <div className="text-center pt-4">
        <Link href="/used-cars">
          <Button size="lg" className="px-8">
            Explore Market Deals
          </Button>
        </Link>
      </div>
    </div>
  );
}
