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
    <article className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-lg hover:border-blue-400 transition-all duration-200 overflow-hidden">
      {/* ── Photo Gallery Section ──────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
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
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 hover:text-red-500 hover:bg-white shadow-xs transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${isSaved ? "fill-red-500 text-red-500" : "text-slate-400"}`}
          />
        </button>

        {/* Photo Count */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-md bg-slate-900/70 backdrop-blur-xs px-2 py-0.5 text-[11px] text-white font-medium">
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
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
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
            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-tabular">
              {formatPriceCompact(listing.priceInr)}
            </span>
            {listing.negotiable && (
              <span className="text-[11px] text-slate-500 ml-1.5 font-medium">Negotiable</span>
            )}
          </div>
          <PriceRatingBadge
            priceRating={listing.priceRating}
            askingPriceInr={listing.priceInr}
          />
        </div>

        {/* EMI & Inspection Score Row (CarDekho / CarWale style) */}
        <div className="mt-1.5 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-blue-800 bg-blue-50 border border-blue-200/80 rounded-md px-2 py-0.5">
            {formatEstimatedEmi(listing.priceInr)}
          </span>
          {listing.inspection && (
            <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-md px-1.5 py-0.5">
              ★ {listing.inspection.score}/10 Inspect
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={detailUrl} className="mt-2.5 block">
          <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
            {listing.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-1">{listing.variant}</p>
        </Link>

        {/* Key-spec line */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-medium py-2 border-y border-slate-100">
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
              className="text-[11px] font-semibold text-blue-700 hover:underline bg-blue-50 border border-blue-200/80 rounded-md px-2 py-0.5 truncate max-w-[140px]"
              title={listing.seller.name}
            >
              {listing.seller.name}
            </Link>
          ) : (
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 rounded-md px-2 py-0.5 capitalize">
              Direct Owner
            </span>
          )}
        </div>

        {/* Locality & Actions Row */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 truncate max-w-[50%]">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
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
                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors border border-emerald-200"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Compare Checkbox */}
            <button
              type="button"
              onClick={handleToggleCompare}
              className={`flex items-center gap-1 font-medium px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                comparing
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                  comparing
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-slate-300 bg-white"
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
