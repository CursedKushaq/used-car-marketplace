import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllDealers } from "@/server/modules/listings/service";
import {
  Building2,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  MessageCircle,
  Phone,
  Sparkles,
  CheckCircle2,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Verified Used Car Dealers in Andhra Pradesh & India",
  description:
    "Discover certified and verified independent pre-owned car dealerships across Visakhapatnam, Vijayawada, Guntur, Tirupati, and Rajahmundry with public digital showrooms, verified stock, and direct WhatsApp contact.",
};

export default function DealersDirectoryPage() {
  const dealers = getAllDealers();

  // Highlight Andhra Pradesh dealers first
  const apDealers = dealers.filter(
    (d) =>
      d.profile.city === "Visakhapatnam" ||
      d.profile.city === "Vijayawada" ||
      d.profile.city === "Guntur" ||
      d.profile.city === "Tirupati" ||
      d.profile.city === "Rajahmundry" ||
      d.profile.city === "Nellore"
  );
  const otherDealers = dealers.filter(
    (d) => !apDealers.some((ap) => ap.profile.id === d.profile.id)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* ── Page Header ─────────────────────────────────── */}
      <div className="border-b border-muted/15 pb-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Andhra Pradesh Verified Dealer Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
          Verified Pre-Owned Dealerships
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
          Browse certified multi-brand used car showrooms across Visakhapatnam, Vijayawada, Guntur, Tirupati, and Coastal Andhra. Every partner dealer provides AP RTO smart card transfer guarantees and verified 160-point inspection records.
        </p>
      </div>

      {/* ── Callout Banner for Dealership Owners ─────────── */}
      <div className="rounded-3xl bg-gradient-to-r from-primary via-[#074747] to-canvas text-white p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-teal-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Are you a used car dealer in Andhra Pradesh?</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Take Your Dealership Online with AutoBazaar
          </h2>
          <p className="text-xs text-teal-100/90 leading-relaxed">
            Get your own branded digital showroom, receive verified buyer enquiries directly on WhatsApp, and manage your inventory with our dealer console.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <Link href="/dealers/sri-venkateswara-car-hub-vizag">
            <Button size="md" className="w-full bg-white text-primary hover:bg-canvas">
              See Sample Showroom
            </Button>
          </Link>
          <Link href="/dealer">
            <Button size="md" variant="outline" className="w-full text-white border-white/50 hover:bg-white/10">
              Open Dealer Console
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Andhra Pradesh Dealerships ───────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
              <span>Showrooms in Andhra Pradesh</span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {apDealers.length} Showrooms
              </span>
            </h2>
            <p className="text-xs text-muted">
              Visakhapatnam, Vijayawada, Guntur, Tirupati, and East Godavari
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apDealers.map(({ profile, stockCount }) => {
            const dealerShowroomUrl = `/dealers/${profile.slug || profile.id}`;
            const whatsappMsg = encodeURIComponent(
              `Hello ${profile.name}! I am viewing your showroom on AutoBazaar and would like to enquire about your available cars in ${profile.city}.`
            );
            const whatsappUrl = profile.whatsappNumber
              ? `https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`
              : `https://wa.me/919848091822?text=${whatsappMsg}`;

            return (
              <div
                key={profile.id}
                className="group rounded-3xl border border-muted/15 bg-surface p-6 space-y-4 hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top: Icon + Name + Rating */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-canvas border border-muted/15 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <Link href={dealerShowroomUrl}>
                          <h3 className="font-extrabold text-base text-ink group-hover:text-primary transition-colors line-clamp-1">
                            {profile.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{profile.locality}, {profile.city}</span>
                        </p>
                      </div>
                    </div>

                    {profile.rating && (
                      <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 rounded-xl px-2 py-0.5 text-xs shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="font-bold text-amber-900">{profile.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Badges / AP RTO */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="rounded-md bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 border border-emerald-200/60">
                      AP RTO Verified
                    </span>
                    <span className="rounded-md bg-canvas text-muted font-medium px-2 py-0.5 border border-muted/15">
                      Est. {profile.verifiedSinceYear}
                    </span>
                  </div>

                  {/* Stock & Stats Row */}
                  <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-muted/10">
                    <div className="p-2.5 rounded-xl bg-canvas space-y-0.5">
                      <span className="text-[11px] text-muted">Active Lot Stock</span>
                      <p className="font-bold text-ink">{stockCount} cars</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-canvas space-y-0.5">
                      <span className="text-[11px] text-muted">Avg Response</span>
                      <p className="font-bold text-ink">&lt; 30 mins</p>
                    </div>
                  </div>
                </div>

                {/* Actions: View Showroom & WhatsApp */}
                <div className="pt-2 flex items-center gap-2">
                  <Link href={dealerShowroomUrl} className="flex-1">
                    <Button size="sm" className="w-full text-xs gap-1.5">
                      <span>View Showroom</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Chat on WhatsApp"
                    className="p-2 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors border border-[#25D366]/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Other Metro Showrooms ────────────────────────── */}
      {otherDealers.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-muted/15">
          <h2 className="text-lg font-bold text-ink">
            Other Verified Partner Dealerships (Metro Hubs)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherDealers.map(({ profile, stockCount }) => (
              <div
                key={profile.id}
                className="rounded-2xl border border-muted/15 bg-surface p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-ink">{profile.name}</h3>
                    <p className="text-xs text-muted">{profile.locality}, {profile.city}</p>
                  </div>
                  <span className="text-xs font-semibold text-muted bg-canvas px-2 py-0.5 rounded-md">
                    {stockCount} cars
                  </span>
                </div>

                <Link href={`/dealers/${profile.slug || profile.id}`}>
                  <Button size="sm" variant="outline" className="w-full text-xs gap-1.5 mt-2">
                    <span>View Showroom</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}