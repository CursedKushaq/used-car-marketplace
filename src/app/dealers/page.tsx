import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllListings } from "@/server/modules/listings/service";
import { Building2, ShieldCheck, Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Verified Used Car Dealers in India",
  description:
    "Discover certified and verified independent used car dealers in Delhi, Mumbai, Bengaluru, Hyderabad, and Pune with public scorecards and verified stock.",
};

export default function DealersDirectoryPage() {
  const listings = getAllListings();

  // Extract distinct dealers
  const dealerMap = new Map();
  for (const car of listings) {
    if (car.seller.type === "verified_dealer" && !dealerMap.has(car.seller.id)) {
      dealerMap.set(car.seller.id, {
        ...car.seller,
        stockCount: listings.filter((l) => l.seller.id === car.seller.id).length,
      });
    }
  }

  const dealers = Array.from(dealerMap.values());

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="border-b border-muted/15 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Dealer Accountability Network</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-ink">
          Verified Dealerships Across India
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
          Every verified dealer on AutoBazaar maintains a public scorecard tracking median response time, inventory accuracy, and verified customer reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealers.map((dealer) => (
          <div
            key={dealer.id}
            className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-4 hover:border-primary hover:shadow-xs transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-canvas border border-muted/15 text-primary">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-ink">{dealer.name}</h3>
                  <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dealer.locality}, {dealer.city}</span>
                  </p>
                </div>
              </div>

              {dealer.rating && (
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 rounded-xl px-2 py-0.5 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-amber-900">{dealer.rating}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-muted/10">
              <div className="p-2.5 rounded-xl bg-canvas space-y-0.5">
                <span className="text-[11px] text-muted">Active Stock</span>
                <p className="font-bold text-ink">{dealer.stockCount} cars</p>
              </div>
              <div className="p-2.5 rounded-xl bg-canvas space-y-0.5">
                <span className="text-[11px] text-muted">Response Time</span>
                <p className="font-bold text-ink">~{dealer.medianResponseHours}h</p>
              </div>
            </div>

            <Link href={`/used-cars?city=${encodeURIComponent(dealer.city)}`}>
              <Button size="sm" variant="outline" className="w-full text-xs gap-1.5">
                <span>View Inventory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
