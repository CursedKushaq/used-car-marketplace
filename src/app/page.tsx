import React from "react";
import Link from "next/link";
import { getAllListings, getAllDealers } from "@/server/modules/listings/service";
import {
  POPULAR_INDIAN_MAKES,
  MAJOR_INDIAN_CITIES,
  BODY_TYPES,
  BUDGET_PRESETS,
} from "@/server/modules/catalog/data";
import { ListingCard } from "@/components/listing/ListingCard";
import { HomeHeroSearch } from "@/components/home/HomeHeroSearch";
import { EmiCalculator } from "@/components/common/EmiCalculator";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  TrendingDown,
  Lock,
  ArrowRight,
  Car,
  BookOpen,
  Building2,
  Star,
  MapPin,
  Check,
  X as XIcon,
  Sparkles,
  CheckCircle2,
  Phone,
} from "lucide-react";

export default function HomePage() {
  const listings = getAllListings();
  const popularCars = listings.slice(0, 6);
  const dealers = getAllDealers();
  const apDealers = dealers
    .filter((d) =>
      ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Rajahmundry"].includes(
        d.profile.city
      )
    )
    .slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ── 1. Hero Section with Tabbed Search (CarDekho & CarWale style) ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-canvas px-4 py-12 sm:py-20 border-b border-muted/10">
        <div className="mx-auto max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface px-4 py-1.5 shadow-xs text-xs font-semibold text-primary">
            <ShieldCheck className="w-4 h-4" />
            <span>India&apos;s Trust-First Used Car Marketplace &bull; Andhra Pradesh &amp; Pan-India</span>
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

          {/* Interactive Multi-Tab Search Box */}
          <HomeHeroSearch />
        </div>
      </section>

      {/* ── 2. Featured Showrooms in Andhra Pradesh (Dealer Focus) ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Verified Dealer Network</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-ink">
              Featured Showrooms in Andhra Pradesh
            </h2>
            <p className="text-xs text-muted">
              Certified multi-brand dealerships in Visakhapatnam, Vijayawada, Guntur &amp; Tirupati
            </p>
          </div>
          <Link
            href="/dealers"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>View all showrooms</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {apDealers.map(({ profile, stockCount }) => {
            const showroomUrl = `/dealers/${profile.slug || profile.id}`;
            return (
              <div
                key={profile.id}
                className="group rounded-2xl border border-muted/15 bg-surface p-5 space-y-3 hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-canvas border border-muted/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Building2 className="w-5 h-5" />
                    </div>
                    {profile.rating && (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-lg">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{profile.rating}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <Link href={showroomUrl}>
                      <h3 className="font-extrabold text-sm text-ink group-hover:text-primary transition-colors line-clamp-1">
                        {profile.name}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-muted flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-primary shrink-0" />
                      <span className="truncate">{profile.locality}, {profile.city}</span>
                    </p>
                  </div>

                  <div className="text-[11px] text-primary font-semibold bg-primary/5 rounded-lg p-2 flex items-center justify-between">
                    <span>Showroom Stock:</span>
                    <span className="font-bold">{stockCount} Verified Cars</span>
                  </div>
                </div>

                <Link href={showroomUrl}>
                  <Button size="sm" variant="outline" className="w-full text-xs gap-1 mt-1">
                    <span>Enter Showroom</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. Browse by Budget ─────────────────────────── */}
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

      {/* ── 4. Recently Verified Vehicles (AP & National Stock) ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
              Recently Verified Listings
            </h2>
            <p className="text-xs text-muted">
              160-point mechanical inspected second-hand cars in Andhra Pradesh and nearby hubs
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

      {/* ── 5. Car Finance & EMI Planner (CarDekho & CarWale style) ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EmiCalculator initialPrice={1200000} carTitle="Your Next Pre-Owned Car" />
      </section>

      {/* ── 6. Carwow-style Comparison: AutoBazaar vs Traditional Classifieds ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-muted/20 bg-surface p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              The AutoBazaar Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              Why Car Buyers &amp; Dealers Prefer AutoBazaar
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Transparent algorithms and verified evidentiary inspections replace guesswork and spam
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-muted/15 bg-canvas/60">
                  <th className="p-3.5 font-bold text-ink w-1/3">Key Feature</th>
                  <th className="p-3.5 font-extrabold text-primary bg-primary/5 w-1/3">
                    AutoBazaar Platform
                  </th>
                  <th className="p-3.5 font-bold text-muted w-1/3">
                    Traditional Classifieds (OLX/Facebook)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/10">
                <tr>
                  <td className="p-3.5 font-semibold text-ink">Price Accuracy</td>
                  <td className="p-3.5 font-bold text-emerald-800 bg-primary/5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Algorithmic Fair Price rating with regional comparables</span>
                  </td>
                  <td className="p-3.5 text-muted">Inflated asking prices, random haggling</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-ink">Mechanical Condition</td>
                  <td className="p-3.5 font-bold text-emerald-800 bg-primary/5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>160-Point certified physical inspection report</span>
                  </td>
                  <td className="p-3.5 text-muted">Unverified seller claims; flood/frame risks</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-ink">Contact Privacy</td>
                  <td className="p-3.5 font-bold text-emerald-800 bg-primary/5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Masked phone numbers with OTP verification (DPDP Act)</span>
                  </td>
                  <td className="p-3.5 text-muted">Phone numbers harvested by telemarketing spammers</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-ink">Direct Dealer Showrooms</td>
                  <td className="p-3.5 font-bold text-emerald-800 bg-primary/5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct WhatsApp with verified Andhra Pradesh dealers</span>
                  </td>
                  <td className="p-3.5 text-muted">Middlemen and unregistered street brokers</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-ink">AP RTO Legal Support</td>
                  <td className="p-3.5 font-bold text-emerald-800 bg-primary/5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Guided Form 29 &amp; 30 and smart card RC transfer</span>
                  </td>
                  <td className="p-3.5 text-muted">Buyer left to handle complex RTO bureaucracy alone</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 7. Three Trust Pillars ───────────────────────── */}
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

      {/* ── 8. Sell Your Car Strip ───────────────────────── */}
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

      {/* ── 9. Guides & Advice Section ───────────────────── */}
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