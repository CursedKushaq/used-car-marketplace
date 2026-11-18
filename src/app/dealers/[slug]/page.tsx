import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDealerBySlug, getAllDealers } from "@/server/modules/listings/service";
import { ListingCard } from "@/components/listing/ListingCard";
import { EmiCalculator } from "@/components/common/EmiCalculator";
import { Button } from "@/components/ui/Button";
import {
  Building2,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  FileCheck2,
  Car,
  BadgeCheck,
  ArrowLeft,
  Share2,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

interface DealerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DealerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dealer = getDealerBySlug(slug);

  if (!dealer) {
    return {
      title: "Dealer Not Found | AutoBazaar",
    };
  }

  return {
    title: `${dealer.profile.name} - Verified Used Cars in ${dealer.profile.city}, AP`,
    description: `Explore verified pre-owned cars at ${dealer.profile.name} in ${dealer.profile.locality}, ${dealer.profile.city}. 160-point inspected, AP RTO transfer guarantee, and transparent fair market pricing.`,
  };
}

export async function generateStaticParams() {
  const dealers = getAllDealers();
  return dealers.map((d) => ({
    slug: d.profile.slug || d.profile.id,
  }));
}

export default async function DealerDetailPage({ params }: DealerPageProps) {
  const { slug } = await params;
  const dealer = getDealerBySlug(slug);

  if (!dealer) {
    notFound();
  }

  const { profile, inventory, stockCount } = dealer;

  // WhatsApp Pre-filled text
  const whatsappMsg = encodeURIComponent(
    `Hello ${profile.name}! I am browsing your showroom on AutoBazaar and would like to enquire about your available used cars in ${profile.city}.`
  );
  const whatsappUrl = profile.whatsappNumber
    ? `https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`
    : `https://wa.me/919848091822?text=${whatsappMsg}`;

  const phoneCallUrl = profile.phoneReal
    ? `tel:${profile.phoneReal.replace(/\s+/g, "")}`
    : `tel:+919848091822`;

  return (
    <div className="space-y-10 pb-16">
      {/* ── Top Breadcrumb Bar ────────────────────────────── */}
      <div className="border-b border-muted/15 bg-surface/50 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            <span>&bull;</span>
            <Link href="/dealers" className="hover:text-ink">
              Verified Dealers
            </Link>
            <span>&bull;</span>
            <span className="text-ink font-semibold">{profile.name}</span>
          </div>

          <Link
            href="/dealers"
            className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Dealerships</span>
          </Link>
        </div>
      </div>

      {/* ── Dealership Header & Showroom Showcase ─────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-muted/20 bg-surface shadow-md">
          {/* Cover Header Banner */}
          <div className="relative h-48 sm:h-64 w-full bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
            {profile.bannerUrl && (
              <img
                src={profile.bannerUrl}
                alt={`${profile.name} Showroom`}
                className="w-full h-full object-cover opacity-35 mix-blend-overlay"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white shadow-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified AutoBazaar Partner Dealer</span>
              </span>
            </div>
          </div>

          {/* Profile Identity Row */}
          <div className="relative px-6 pb-6 pt-0 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-blue-600 shrink-0 overflow-hidden">
                  <Building2 className="w-12 h-12" />
                </div>
                <div className="space-y-1 pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                      {profile.name}
                    </h1>
                    <BadgeCheck className="w-6 h-6 text-blue-600 fill-blue-50" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{profile.locality}, {profile.city}, Andhra Pradesh</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Call */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial"
                >
                  <Button
                    size="md"
                    className="w-full gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white border-none shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </Button>
                </a>

                <a href={phoneCallUrl} className="flex-1 sm:flex-initial">
                  <Button size="md" variant="secondary" className="w-full gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>Call Showroom</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Dealer Badges & Compliance Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-muted/15 text-xs">
              <div className="space-y-0.5">
                <span className="text-[11px] text-muted">Customer Rating</span>
                <p className="font-extrabold text-ink flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{profile.rating ?? 4.8} / 5.0</span>
                  <span className="text-xs font-normal text-muted">
                    ({profile.reviewCount ?? 120}+ reviews)
                  </span>
                </p>
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] text-muted">AP RTO Trade Certificate</span>
                <p className="font-bold text-ink truncate text-xs" title={profile.tradeCertificateNo}>
                  {profile.tradeCertificateNo || "AP31/TC/PREOWNED/2021"}
                </p>
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] text-muted">GSTIN Registration</span>
                <p className="font-bold text-ink text-xs font-mono">
                  {profile.gstin || "37AAACS1429B1Z2"}
                </p>
              </div>

              <div className="space-y-0.5">
                <span className="text-[11px] text-muted">Active Showroom Stock</span>
                <p className="font-extrabold text-primary text-sm">
                  {stockCount} Verified Cars on Lot
                </p>
              </div>
            </div>

            {/* Description & Operating Hours */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                  About This Dealership
                </h3>
                <p className="text-xs sm:text-sm text-ink/80 leading-relaxed">
                  {profile.description ||
                    `${profile.name} is one of ${profile.city}'s most trusted multi-brand pre-owned automobile dealerships. Every car on the lot undergoes a 160-point certified mechanical inspection, comes with clear Parivahan AP smart card RC paperwork, and is offered with flexible bank financing.`}
                </p>
              </div>

              <div className="rounded-2xl border border-muted/15 bg-canvas p-4 space-y-2.5 text-xs">
                <h3 className="font-bold text-ink flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Showroom Operating Hours</span>
                </h3>
                <p className="text-muted font-medium">
                  {profile.showroomHours || "Monday – Sunday: 9:00 AM – 9:00 PM"}
                </p>
                <div className="pt-1 border-t border-muted/10">
                  <span className="text-[11px] text-muted block mb-0.5">Showroom Address:</span>
                  <p className="font-medium text-ink leading-tight">
                    {profile.address || `${profile.locality}, ${profile.city}, Andhra Pradesh`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dealership Trust Guarantees ──────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 flex items-start gap-3 shadow-xs">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-900">AP RTO Transfer Guarantee</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Form 29 &amp; 30 paperwork handled end-to-end until smart card RC delivery.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 flex items-start gap-3 shadow-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-900">160-Point Certified Lot</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Zero flood damage, zero accidental frame repairs, verified authentic odometer.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 flex items-start gap-3 shadow-xs">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-900">Bank Loan Approvals</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Tie-ups with SBI, HDFC, Sundaram Finance, and Chola with spot loan sanctions.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 flex items-start gap-3 shadow-xs">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs text-slate-900">Old Car Exchange</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Spot valuation and trade-in bonus when upgrading your current vehicle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Active Showroom Inventory ─────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-muted/15 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-ink flex items-center gap-2">
              <span>Current Showroom Inventory</span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                {stockCount} Available
              </span>
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Inspected second-hand cars available for immediate inspection and test drive at this showroom
            </p>
          </div>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Ask About Upcoming Cars</span>
            </Button>
          </a>
        </div>

        {inventory.length === 0 ? (
          <div className="rounded-2xl border border-muted/20 bg-surface p-12 text-center space-y-3">
            <Car className="w-10 h-10 text-muted mx-auto" />
            <h3 className="font-bold text-ink text-base">All cars currently reserved or sold</h3>
            <p className="text-xs text-muted max-w-md mx-auto">
              This showroom has recently turned over its lot. Reach out on WhatsApp to get notified when fresh inventory arrives.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((car) => (
              <ListingCard key={car.id} listing={car} />
            ))}
          </div>
        )}
      </div>

      {/* ── Showroom Car Loan EMI Planner ────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EmiCalculator
          initialPrice={inventory[0]?.priceInr || 1500000}
          carTitle={`Cars at ${profile.name}`}
        />
      </div>

      {/* ── Dealer Contact & Location Section ────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-muted/20 bg-gradient-to-br from-surface to-canvas p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Visit The Showroom In Person
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-ink">
              Ready to test drive a car at {profile.name}?
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Drop by the showroom in {profile.locality}, {profile.city}. Our staff will assist with vehicle inspection, service history records, and live test drives.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-ink pt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{profile.locality}, {profile.city}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>Open Today until 9 PM</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button size="lg" className="w-full gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white border-none">
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Dealer</span>
              </Button>
            </a>
            <a href={phoneCallUrl} className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full gap-2">
                <Phone className="w-5 h-5 text-primary" />
                <span>Call {profile.phoneMasked}</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}