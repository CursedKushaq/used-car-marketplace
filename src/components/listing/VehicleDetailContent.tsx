"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { CarListing } from "@/server/modules/catalog/types";
import { formatCurrency, formatPriceCompact, formatKm, formatOwnership, formatEstimatedEmi } from "@/lib/format";
import { DetailGallery } from "./DetailGallery";
import { PriceRatingBadge } from "./PriceRatingBadge";
import { VerificationLadderBadge } from "./VerificationLadderBadge";
import { VerificationLadderView } from "./VerificationLadderView";
import { InspectionSummaryView } from "./InspectionSummaryView";
import { PaperworkChecklistView } from "./PaperworkChecklistView";
import { DealerScorecardView } from "./DealerScorecardView";
import { EnquiryModal } from "./EnquiryModal";
import { ListingCard } from "./ListingCard";
import { EmiCalculator } from "../common/EmiCalculator";
import { useCompare } from "../compare/CompareContext";
import { Button } from "../ui/Button";
import {
  Phone,
  Calendar,
  Share2,
  Heart,
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  Flag,
  Shield,
  MapPin,
  Clock,
  Sparkles,
  MessageCircle,
} from "lucide-react";

interface VehicleDetailContentProps {
  listing: CarListing;
  similarListings: CarListing[];
}

export const VehicleDetailContent: React.FC<VehicleDetailContentProps> = ({
  listing,
  similarListings,
}) => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportReason, setReportReason] = useState("Price discrepancy");
  const [isSaved, setIsSaved] = useState(false);
  const { toggleCompare, isComparing } = useCompare();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `Check out this ${listing.title} on AutoBazaar:`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setReportSubmitted(false);
    }, 1500);
  };

  const comparing = isComparing(listing.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* ── Breadcrumb Navigation ──────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span>&bull;</span>
        <Link href="/used-cars" className="hover:text-ink">
          Used Cars
        </Link>
        <span>&bull;</span>
        <Link
          href={`/used-cars?city=${encodeURIComponent(listing.city)}`}
          className="hover:text-ink"
        >
          {listing.city}
        </Link>
        <span>&bull;</span>
        <span className="text-ink font-semibold truncate max-w-[200px]">
          {listing.title}
        </span>
      </nav>

      {/* ── Top Grid: Gallery & Main Action Box ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery & Highlights (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <DetailGallery photos={listing.photos} title={listing.title} />

          {/* Quick specs pill grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-3.5 space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Year</span>
              <p className="text-sm font-bold text-slate-900">{listing.year}</p>
            </div>
            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-3.5 space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Kilometres</span>
              <p className="text-sm font-bold text-slate-900">{formatKm(listing.km)}</p>
            </div>
            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-3.5 space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Fuel &amp; Gear</span>
              <p className="text-sm font-bold text-slate-900 capitalize">
                {listing.fuel} / {listing.transmission}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-3.5 space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Ownership</span>
              <p className="text-sm font-bold text-slate-900">
                {formatOwnership(listing.owners)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Pricing & Sticky Action Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-5">
            {/* Title Block */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {listing.registrationState} Reg
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {listing.locality}, {listing.city}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {listing.title}
              </h1>
              <p className="text-sm font-medium text-slate-500">{listing.variant}</p>
            </div>

            {/* Price Box */}
            <div className="rounded-xl bg-slate-50 p-4.5 border border-slate-200/90 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black text-slate-900 font-tabular">
                    {formatPriceCompact(listing.priceInr)}
                  </span>
                  <span className="block text-xs text-slate-500 font-medium mt-0.5">
                    ({formatCurrency(listing.priceInr)})
                  </span>
                </div>
                <PriceRatingBadge
                  priceRating={listing.priceRating}
                  askingPriceInr={listing.priceInr}
                />
              </div>

              {/* CarDekho / CarWale Style EMI Pill */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                <span className="text-slate-600 font-medium">Estimated Monthly EMI:</span>
                <span className="font-extrabold text-blue-800 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-md">
                  {formatEstimatedEmi(listing.priceInr)}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 leading-tight border-t border-slate-200/60 pt-2">
                Transfer fees &amp; RTO road tax are paid directly to the authority and not included in asking price.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 pt-2">
              {listing.seller.type === "verified_dealer" && (
                <a
                  href={`https://wa.me/${(listing.seller.whatsappNumber || "919848091822").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello ${listing.seller.name}! I am interested in the ${listing.title} (${listing.registrationNumberMasked || ""}) listed on AutoBazaar in ${listing.city}. Is it available for a test drive?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    size="lg"
                    className="w-full gap-2 text-sm sm:text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat with Showroom on WhatsApp</span>
                  </Button>
                </a>
              )}

              <Button
                size="lg"
                variant={listing.seller.type === "verified_dealer" ? "secondary" : "primary"}
                onClick={() => setEnquiryModalOpen(true)}
                className="w-full gap-2 text-sm sm:text-base font-bold shadow-xs cursor-pointer"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Check Availability &amp; Unlock Phone</span>
              </Button>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${isSaved
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? "fill-red-500" : ""}`} />
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleCompare(listing.id)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${comparing
                      ? "bg-blue-50 border-blue-600 text-blue-700 font-bold"
                      : "bg-white border-slate-200/90 text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  <GitCompare className="w-4 h-4" />
                  <span>{comparing ? "Comparing" : "Compare"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200/90 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Trust badge row */}
            <div className="pt-2 border-t border-muted/10 flex items-center justify-between text-xs text-muted">
              <VerificationLadderBadge summary={listing.verificationLadder} />
              <button
                type="button"
                onClick={() => setReportModalOpen(true)}
                className="flex items-center gap-1 text-[11px] text-muted hover:text-danger cursor-pointer"
              >
                <Flag className="w-3 h-3" />
                <span>Report Listing</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mid Section: Trust, Inspection & Specs ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* 1. 5-Point Verification Ladder */}
          <section aria-labelledby="verification-section">
            <h2 id="verification-section" className="sr-only">
              Verification Ladder
            </h2>
            <VerificationLadderView summary={listing.verificationLadder} />
          </section>

          {/* 2. 160-Point Inspection Summary */}
          <section aria-labelledby="inspection-section">
            <h2 id="inspection-section" className="sr-only">
              Inspection Report
            </h2>
            <InspectionSummaryView inspection={listing.inspection} />
          </section>

          {/* 3. Paperwork & Legal Verification */}
          <section aria-labelledby="paperwork-section">
            <h2 id="paperwork-section" className="sr-only">
              Paperwork Details
            </h2>
            <PaperworkChecklistView paperwork={listing.paperwork} />
          </section>

          {/* 4. Specifications & Features */}
          <section className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-5">
            <h3 className="font-bold text-ink text-base">Key Features &amp; Equipment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {listing.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 text-xs font-medium text-ink bg-canvas p-2.5 rounded-xl border border-muted/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-muted/10">
              <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-2">
                Seller Description
              </h4>
              <p className="text-xs text-ink leading-relaxed whitespace-pre-line bg-canvas p-4 rounded-xl border border-muted/10">
                {listing.description}
              </p>
            </div>
          </section>

          {/* 5. Car Finance & EMI Calculator (CarDekho & CarWale style) */}
          <section aria-labelledby="finance-calculator-section">
            <h2 id="finance-calculator-section" className="sr-only">
              Finance &amp; EMI Calculator
            </h2>
            <EmiCalculator initialPrice={listing.priceInr} carTitle={listing.title} />
          </section>
        </div>

        {/* Right Sidebar: Dealer Scorecard & Safety Advice */}
        <div className="lg:col-span-4 space-y-6">
          <DealerScorecardView seller={listing.seller} />

          {/* Safety Notice Card */}
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Shield className="w-4 h-4 text-amber-700" />
              <span>AutoBazaar Safety Promise</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              We never ask for deposits, booking fees, or shipping advances. All deals are finalized in person after test driving and verifying the original Registration Certificate.
            </p>
            <Link
              href="/safety"
              className="text-xs font-bold text-amber-900 hover:underline block pt-1"
            >
              Read used-car fraud prevention guide &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ── Similar Vehicles Section ───────────────────── */}
      {similarListings.length > 0 && (
        <section className="pt-8 border-t border-muted/15 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-ink">Similar Cars You Might Like</h3>
              <p className="text-xs text-muted">
                Comparable {listing.bodyType}s and models in the same budget range
              </p>
            </div>
            <Link
              href={`/used-cars?bodyType=${listing.bodyType}`}
              className="text-xs font-bold text-primary hover:underline"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarListings.map((car) => (
              <ListingCard key={car.id} listing={car} />
            ))}
          </div>
        </section>
      )}

      {/* ── Sticky Bottom Action Bar for Mobile ────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-muted/20 p-3 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-lg font-bold text-ink font-tabular">
            {formatPriceCompact(listing.priceInr)}
          </span>
          <span className="block text-[11px] text-muted">
            {listing.year} &bull; {formatKm(listing.km)}
          </span>
        </div>
        <Button
          onClick={() => setEnquiryModalOpen(true)}
          size="sm"
          className="gap-2 px-5 font-bold"
        >
          <Phone className="w-4 h-4" />
          <span>Contact Seller</span>
        </Button>
      </div>

      {/* Interactive Modals */}
      <EnquiryModal
        listing={listing}
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />

      {/* Report Modal */}
      {reportModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setReportModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl border border-muted/20"
            onClick={(e) => e.stopPropagation()}
          >
            {reportSubmitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-ink text-base">Report Submitted</h4>
                <p className="text-xs text-muted">
                  Thank you. Our moderation team will investigate this listing within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <h3 className="font-bold text-ink text-base">Report this Listing</h3>
                <p className="text-xs text-muted">
                  Help maintain trust on AutoBazaar by flagging suspicious or inaccurate listings.
                </p>
                <div>
                  <label className="text-xs font-semibold text-ink block mb-1">
                    Reason for report
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink"
                  >
                    <option value="Price discrepancy">Suspicious or inaccurate price</option>
                    <option value="Already sold">Car is already sold</option>
                    <option value="Odometer tampering">Suspected odometer rollback</option>
                    <option value="Fake photos">Inaccurate or copied photos</option>
                    <option value="Scam seller">Seller demanding advance booking deposit</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setReportModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="danger">
                    Submit Report
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
