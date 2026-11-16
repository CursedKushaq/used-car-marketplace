"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllListings } from "@/server/modules/listings/service";
import type { CarListing } from "@/server/modules/catalog/types";
import { ListingCard } from "@/components/listing/ListingCard";
import { Button } from "@/components/ui/Button";
import { Heart, ArrowLeft, Search } from "lucide-react";

const SAVED_STORAGE_KEY = "autobazaar_saved_cars";

export default function SavedCarsPage() {
  const [savedCars, setSavedCars] = useState<CarListing[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_STORAGE_KEY);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        if (Array.isArray(ids)) {
          const all = getAllListings();
          setSavedCars(all.filter((c) => ids.includes(c.id)));
        }
      }
    } catch {
      // Ignore
    }
    setLoaded(true);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-muted/15 pb-6 space-y-2">
        <Link
          href="/used-cars"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to browse</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-ink">
          Your Saved Vehicles
        </h1>
        <p className="text-xs text-muted">
          Track price drops, compare specs, and contact sellers when you&apos;re ready.
        </p>
      </div>

      {!loaded ? (
        <div className="py-12 text-center text-xs text-muted">Loading saved cars...</div>
      ) : savedCars.length === 0 ? (
        <div className="rounded-2xl border border-muted/20 bg-surface p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-canvas flex items-center justify-center mx-auto text-muted">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-ink">No saved cars yet</h2>
          <p className="text-xs text-muted leading-relaxed">
            As you browse through used cars, tap the heart icon on any vehicle card to save it to your shortlist.
          </p>
          <Link href="/used-cars">
            <Button size="sm" className="mt-2 gap-1.5">
              <Search className="w-4 h-4" />
              <span>Browse Cars</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCars.map((car) => (
            <ListingCard key={car.id} listing={car} />
          ))}
        </div>
      )}
    </div>
  );
}
