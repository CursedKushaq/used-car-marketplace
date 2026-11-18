"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { CarListing } from "@/server/modules/catalog/types";
import { formatPriceCompact, formatKm, formatOwnership, formatEstimatedEmi } from "@/lib/format";
import { PriceRatingBadge } from "./PriceRatingBadge";
import { VerificationLadderBadge } from "./VerificationLadderBadge";
import { useCompare } from "../compare/CompareContext";
import { Heart, Camera, MapPin, Check, MessageCircle } from "lucide-react";

interface ListingCardProps {
  listing: CarListing;
}

const SAVED_STORAGE_KEY = "autobazaar_saved_cars";

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { isComparing, toggleCompare } = useCompare();
  const [isSaved, setIsSaved] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      if (stored) {
        const ids = JSON.parse(stored);
        if (Array.isArray(ids) && ids.includes(listing.id)) {
          setIsSaved(true);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, [listing.id]);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      let ids: string[] = stored ? JSON.parse(stored) : [];
      if (ids.includes(listing.id)) {
        ids = ids.filter((id) => id !== listing.id);
        setIsSaved(false);
      } else {
        ids.push(listing.id);
        setIsSaved(true);
      }
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(ids));
      window.dispatchEvent(new Event("autobazaar_saved_updated"));
    } catch {
      setIsSaved(!isSaved);
    }
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(listing.id);
  };

  const detailUrl = `/car/${listing.slug}-${listing.id}`;
  const comparing = isComparing(listing.id);

  return (
    <article className="group relative flex flex-col rounded-2xl border border-muted/15 bg-surface shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* ── Photo Gallery Section ──────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas">
        <Link href={detailUrl} className="block w-full h-full">
          <img
            src={listing.photos[photoIndex]?.url || listing.photos[0]?.url}
            alt={listing.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        </Link>

        {/* Verified Status Ribbon */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-emerald-600/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white flex items-center gap-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Verified
          </span>
        </div>

        {/* Save / Favorite Button */}
        <button
          onClick={handleToggleSave}
          aria-label={isSaved ? "Remove from saved" : "Save car"}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-xs text-ink hover:text-red-500 hover:bg-white shadow-xs transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : "text-muted"}`}
          />
        </button>

        {/* Photo Count */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[11px] text-white">
          <Camera className="w-3 h-3" />
          <span>{listing.photos.length}</span>
        </div>

        {/* Multi-photo thumbnail pills */}
        {listing.photos.length > 1 && (
          <div className="absolute bottom-3 left-3 z-10 flex gap-1">
            {listing.photos.slice(0, 4).map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`View photo ${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPhotoIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  photoIndex === idx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Content Section ────────────────────────────── */}
      <div className="flex flex-1 flex-col p-4.5">
        {/* Price & Rating Row */}
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-xl font-bold tracking-tight text-ink font-tabular">
              {formatPriceCompact(listing.priceInr)}
            </span>
            {listing.negotiable && (
              <span className="text-[11px] text-muted ml-1.5 font-medium">Negotiable</span>
            )}
          </div>
          <PriceRatingBadge
            priceRating={listing.priceRating}
            askingPriceInr={listing.priceInr}
          />
        </div>

        {/* EMI & Inspection Score Row (CarDekho / CarWale style) */}
        <div className="mt-1 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-md px-2 py-0.5">
            {formatEstimatedEmi(listing.priceInr)}
          </span>
          {listing.inspection && (
            <span className="font-bold text-amber-900 bg-amber-50 border border-amber-200/80 rounded-md px-1.5 py-0.5">
              ★ {listing.inspection.score}/10 Inspect
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={detailUrl} className="mt-2 block">
          <h3 className="font-bold text-ink text-base line-clamp-1 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>
          <p className="text-xs text-muted line-clamp-1">{listing.variant}</p>
        </Link>

        {/* Key-spec line */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted font-medium py-2 border-y border-muted/10">
          <span>{listing.year}</span>
          <span>&bull;</span>
          <span>{formatKm(listing.km)}</span>
          <span>&bull;</span>
          <span className="capitalize">{listing.fuel}</span>
          <span>&bull;</span>
          <span className="capitalize">{listing.transmission}</span>
          <span>&bull;</span>
          <span>{formatOwnership(listing.owners)}</span>
        </div>

        {/* Verification & Trust Row */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <VerificationLadderBadge summary={listing.verificationLadder} />

          {listing.seller.type === "verified_dealer" ? (
            <Link
              href={`/dealers/${listing.seller.slug || listing.seller.id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-semibold text-primary hover:underline bg-primary/5 border border-primary/20 rounded-md px-2 py-0.5 truncate max-w-[140px]"
              title={listing.seller.name}
            >
              {listing.seller.name}
            </Link>
          ) : (
            <span className="text-[11px] font-semibold text-muted bg-canvas border border-muted/15 rounded-md px-2 py-0.5 capitalize">
              Direct Owner
            </span>
          )}
        </div>

        {/* Locality & Actions Row */}
        <div className="mt-3.5 pt-3 border-t border-muted/10 flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-1 truncate max-w-[50%]">
            <MapPin className="w-3.5 h-3.5 text-muted/80 shrink-0" />
            <span className="truncate">{listing.locality}</span>
          </div>

          <div className="flex items-center gap-2">
            {listing.seller.type === "verified_dealer" && (
              <a
                href={`https://wa.me/${(listing.seller.whatsappNumber || "919848091822").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello ${listing.seller.name}! I saw ${listing.title} (${listing.registrationNumberMasked || ""}) on AutoBazaar. Is it available for a test drive?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Chat with showroom on WhatsApp"
                className="p-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Compare Checkbox */}
            <button
              type="button"
              onClick={handleToggleCompare}
              className={`flex items-center gap-1 font-medium px-2 py-1 rounded-lg transition-colors ${
                comparing
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted hover:text-ink hover:bg-canvas"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                  comparing
                    ? "bg-primary border-primary text-white"
                    : "border-muted/40 bg-surface"
                }`}
              >
                {comparing && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <span>Compare</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
