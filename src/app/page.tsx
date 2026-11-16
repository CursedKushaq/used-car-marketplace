import React from "react";
import Link from "next/link";
import { getAllListings } from "@/server/modules/listings/service";
import {
  POPULAR_INDIAN_MAKES,
  MAJOR_INDIAN_CITIES,
  BODY_TYPES,
  BUDGET_PRESETS,
} from "@/server/modules/catalog/data";
import { ListingCard } from "@/components/listing/ListingCard";
import { Button } from "@/components/ui/Button";
import {
  Search,
  ShieldCheck,
  TrendingDown,
  Lock,
  ArrowRight,
  Car,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  const listings = getAllListings();
  const popularCars = listings.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ── Hero Search Section ────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-canvas px-4 py-16 sm:py-24 border-b border-muted/10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface px-4 py-1.5 shadow-xs text-xs font-semibold text-primary">
            <ShieldCheck className="w-4 h-4" />
            <span>India&apos;s Trust-First Used Car Marketplace</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ink leading-tight">
            Find your trusted used car with{" "}
            <span className="text-primary underline decoration-primary/30 decoration-wavy">
              price transparency
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Every car carries an objective market price rating, a 5-point verification ladder, and 160-point mechanical inspection data. No fake listings, zero lead spam.
          </p>

          {/* Search Box */}
          <form
            action="/used-cars"
            className="mx-auto max-w-2xl rounded-2xl border border-muted/20 bg-surface p-2 shadow-lg flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                name="q"
                placeholder="Search Swift, Creta, Thar, city, or budget…"
                className="w-full rounded-xl bg-transparent py-3 pl-10 pr-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none"
              />
            </div>
            <Button type="submit" size="md" className="w-full sm:w-auto px-8 gap-2">
              <Search className="w-4 h-4" />
              <span>Search Cars</span>
            </Button>
          </form>

          {/* Quick Model Links */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="text-muted font-semibold">Popular in India:</span>
            {["Maruti Swift", "Hyundai Creta", "Mahindra Thar", "Tata Nexon", "Honda City", "Toyota Innova"].map(
              (model) => (
                <Link
                  key={model}
                  href={`/used-cars?q=${encodeURIComponent(model)}`}
                  className="rounded-full border border-muted/20 bg-surface px-3 py-1 font-medium text-ink hover:border-primary hover:text-primary transition-colors"
                >
                  {model}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── Browse by Budget ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
              Browse by Budget
            </h2>
            <p className="text-xs text-muted">
              Select your budget bracket in Indian Rupees (₹)
            </p>
          </div>
          <Link
            href="/used-cars"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>View all cars</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {BUDGET_PRESETS.map((preset) => (
            <Link
              key={preset.label}
              href={`/used-cars?budgetMin=${preset.min}&budgetMax=${preset.max}`}
              className="group rounded-2xl border border-muted/15 bg-surface p-4 text-center hover:border-primary hover:shadow-xs transition-all"
            >
              <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                {preset.label}
              </span>
              <span className="text-[11px] text-muted mt-1 block">
                Verified listings &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Browse by Body Type ────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
            Browse by Body Type
          </h2>
          <p className="text-xs text-muted">
            Find the right silhouette for your family and commute
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BODY_TYPES.map((type) => (
            <Link
              key={type.id}
              href={`/used-cars?bodyType=${type.id}`}
              className="group flex flex-col items-center rounded-2xl border border-muted/15 bg-surface p-6 text-center hover:border-primary hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-canvas flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-3">
                <Car className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm text-ink group-hover:text-primary transition-colors">
                {type.label}
              </span>
              <span className="text-xs text-muted mt-1">Explore inventory</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recently Verified Vehicles ─────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
              Recently Verified Listings
            </h2>
            <p className="text-xs text-muted">
              Vehicles inspected and price-benchmarked within the past 48 hours
            </p>
          </div>
          <Link
            href="/used-cars?sort=rating_best"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>See best deals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCars.map((car) => (
            <ListingCard key={car.id} listing={car} />
          ))}
        </div>
      </section>

      {/* ── Three Trust Pillars Section ────────────────── */}
      <section className="border-y border-muted/15 bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
              How AutoBazaar Fixes Used Car Buying
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Built on transparency, evidence-backed claims, and respect for buyer privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="rounded-2xl border border-muted/15 bg-canvas p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-ink">
                Price Ratings with Workings
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                We compare asking prices against verified active listings for the same variant, age, and kilometres in your city. You see the exact comparison pool, not a black-box opinion.
              </p>
              <Link
                href="/how-price-ratings-work"
                className="text-xs font-bold text-primary hover:underline block pt-1"
              >
                Learn our pricing methodology &rarr;
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-2xl border border-muted/15 bg-canvas p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-ink">
                5-Point Verification Ladder
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                No single vague &ldquo;certified&rdquo; sticker. Every check (identity, RC ownership, insurance, odometer, physical inspection) shows its evidentiary level: Declared, Document Seen, or Partner Checked.
              </p>
              <Link
                href="/how-we-verify"
                className="text-xs font-bold text-primary hover:underline block pt-1"
              >
                Explore the verification ladder &rarr;
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-2xl border border-muted/15 bg-canvas p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-ink">
                Private-by-Default Enquiries
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Seller and buyer phone numbers remain masked until an OTP-verified inquiry with explicit consent under India&apos;s DPDP Act. Say goodbye to telemarketing spam and fake buyers.
              </p>
              <Link
                href="/safety"
                className="text-xs font-bold text-primary hover:underline block pt-1"
              >
                Read our privacy &amp; safety rules &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sell Your Car Strip ────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-[#085252] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-200">
              For Private Sellers &amp; Dealers
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Sell your car from your phone in under 10 minutes
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              Get an instant valuation estimate based on local market comparables. Guided photo uploads, automated RC checks, and zero spam calls.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link href="/sell">
              <Button size="lg" className="w-full bg-white text-primary hover:bg-canvas">
                Get Instant Estimate
              </Button>
            </Link>
            <Link href="/sell/new">
              <Button size="lg" variant="outline" className="w-full text-white border-white/50 hover:bg-white/10">
                List Your Car Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Guides & Advice Section ────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
              Used Car Buyer Guides &amp; Paperwork Advice
            </h2>
            <p className="text-xs text-muted">
              India-specific guides for RC transfer, hypothecation clearance, and insurance
            </p>
          </div>
          <Link href="/guides" className="text-xs font-bold text-primary hover:underline">
            View all guides &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "How to Transfer RC Ownership in India",
              slug: "rc-transfer-guide-india",
              excerpt: "Step-by-step walkthrough of Parivahan Form 29 & 30, RTO fees, and buyer/seller checklists.",
              readTime: "6 min read",
            },
            {
              title: "Hypothecation (HP) Removal & Form 35 Guide",
              slug: "hypothecation-removal-guide",
              excerpt: "How to remove bank loan endorsement from your vehicle RC after loan foreclosure.",
              readTime: "5 min read",
            },
            {
              title: "10-Point Pre-Purchase Physical Inspection Checklist",
              slug: "used-car-inspection-checklist",
              excerpt: "Detecting odometer tampering, accidental panel repaints, and flood damage before paying.",
              readTime: "8 min read",
            },
          ].map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group rounded-2xl border border-muted/15 bg-surface p-6 space-y-3 hover:border-primary hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-2 text-primary text-xs font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>{guide.readTime}</span>
              </div>
              <h3 className="font-bold text-base text-ink group-hover:text-primary transition-colors">
                {guide.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">{guide.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
