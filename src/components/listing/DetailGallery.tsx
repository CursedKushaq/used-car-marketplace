"use client";

import React, { useState } from "react";
import type { VehiclePhoto } from "@/server/modules/catalog/types";
import { Camera, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface DetailGalleryProps {
  photos: VehiclePhoto[];
  title: string;
}

export const DetailGallery: React.FC<DetailGalleryProps> = ({ photos, title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const prevPhoto = () => {
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextPhoto = () => {
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const currentPhoto = photos[selectedIndex] || photos[0];

  return (
    <div className="space-y-3">
      {/* ── Main Large Photo Container ────────────────── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-canvas border border-muted/15 shadow-xs">
        <img
          src={currentPhoto.url}
          alt={`${title} - ${currentPhoto.caption}`}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Verified Inspection Ribbon */}
        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-full bg-emerald-600/90 backdrop-blur-xs px-3 py-1 text-xs font-bold tracking-wide text-white flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            160-Point Inspected
          </span>
        </div>

        {/* Angle Caption Pill */}
        <div className="absolute top-4 right-4 z-10">
          <span className="rounded-xl bg-black/60 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-white">
            {currentPhoto.caption}
          </span>
        </div>

        {/* Arrow Navigation */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-ink shadow-md transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextPhoto}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-ink shadow-md transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 rounded-xl bg-black/60 backdrop-blur-xs px-3 py-1 text-xs text-white">
          <Camera className="w-3.5 h-3.5" />
          <span>
            {selectedIndex + 1} of {photos.length}
          </span>
        </div>
      </div>

      {/* ── Thumbnail Strip ───────────────────────────── */}
      {photos.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {photos.map((photo, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-[4/3] w-20 sm:w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                selectedIndex === idx
                  ? "border-primary shadow-xs scale-98"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
