"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  IndianRupee,
  Car,
  Building2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/Button";
import {
  POPULAR_INDIAN_MAKES,
  MAJOR_INDIAN_CITIES,
  BODY_TYPES,
  BUDGET_PRESETS,
} from "@/server/modules/catalog/data";

export const HomeHeroSearch: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"search" | "budget" | "body" | "brand">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All India");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    }
    if (selectedCity && selectedCity !== "All India") {
      params.set("city", selectedCity);
    }
    router.push(`/used-cars?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* ── City Quick Selector Bar (CarDekho style) ──────── */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap text-xs font-semibold text-muted">
        <span className="flex items-center gap-1 text-ink mr-1">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>Top AP Hubs:</span>
        </span>
        {["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Rajahmundry", "Hyderabad"].map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => {
              setSelectedCity(city);
              router.push(`/used-cars?city=${encodeURIComponent(city)}`);
            }}
            className={`rounded-full px-3 py-1 transition-all ${
              selectedCity === city
                ? "bg-primary text-white shadow-xs"
                : "bg-surface border border-muted/20 text-ink hover:border-primary hover:text-primary"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* ── Main Tabbed Search Box (CarDekho / CarWale style) ── */}
      <div className="rounded-3xl border border-muted/20 bg-surface p-3 sm:p-5 shadow-xl space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 border-b border-muted/10 pb-3">
          {[
            { id: "search", label: "Search by Model", icon: Search },
            { id: "budget", label: "By Budget", icon: IndianRupee },
            { id: "body", label: "By Body Type", icon: Car },
            { id: "brand", label: "By Brand", icon: Building2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  active
                    ? "bg-primary text-white shadow-xs"
                    : "text-muted hover:text-ink hover:bg-canvas"
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Free Search */}
        {activeTab === "search" && (
          <form onSubmit={handleSearchSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="E.g. Innova Crysta, Creta, Swift, Thar, Seltos, Vizag..."
                  className="w-full rounded-2xl bg-canvas py-3 pl-10 pr-3 text-sm text-ink placeholder:text-muted/60 focus:outline-none border border-muted/15"
                />
              </div>

              <Button type="submit" size="md" className="w-full sm:w-auto px-8 gap-2 font-bold">
                <Search className="w-4 h-4" />
                <span>Find Cars</span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] pt-1">
              <span className="text-muted font-medium">Trending searches:</span>
              {["Innova Crysta", "Creta Diesel", "Swift ZXi", "Thar 4x4", "Seltos GTX", "Nexon"].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      router.push(`/used-cars?q=${encodeURIComponent(term)}`);
                    }}
                    className="rounded-full bg-canvas border border-muted/15 px-2.5 py-0.5 text-ink hover:border-primary hover:text-primary transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </form>
        )}

        {/* Tab 2: By Budget */}
        {activeTab === "budget" && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 py-2">
            {BUDGET_PRESETS.map((preset) => (
              <Link
                key={preset.label}
                href={`/used-cars?budgetMin=${preset.min}&budgetMax=${preset.max}`}
                className="group rounded-2xl border border-muted/15 bg-canvas p-3 text-center hover:border-primary hover:bg-surface hover:shadow-xs transition-all"
              >
                <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                  {preset.label}
                </span>
                <span className="text-[10px] text-muted mt-1 block">
                  View inventory &rarr;
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Tab 3: By Body Type */}
        {activeTab === "body" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
            {BODY_TYPES.map((type) => (
              <Link
                key={type.id}
                href={`/used-cars?bodyType=${type.id}`}
                className="group flex flex-col items-center rounded-2xl border border-muted/15 bg-canvas p-3.5 text-center hover:border-primary hover:bg-surface hover:shadow-xs transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-2 shadow-xs">
                  <Car className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-ink group-hover:text-primary transition-colors">
                  {type.label}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Tab 4: By Brand */}
        {activeTab === "brand" && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 py-2">
            {POPULAR_INDIAN_MAKES.slice(0, 6).map((make) => (
              <Link
                key={make}
                href={`/used-cars?make=${encodeURIComponent(make)}`}
                className="group rounded-xl border border-muted/15 bg-canvas p-3 text-center hover:border-primary hover:bg-surface transition-all"
              >
                <span className="font-bold text-xs text-ink group-hover:text-primary transition-colors block truncate">
                  {make}
                </span>
                <span className="text-[10px] text-muted">View stock</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};