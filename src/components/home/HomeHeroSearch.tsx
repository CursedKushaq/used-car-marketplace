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
    <div className="mx-auto max-w-4xl space-y-5">
      {/* ── City Quick Selector Bar (CarDekho style) ──────── */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap text-xs font-semibold text-slate-600">
        <span className="flex items-center gap-1 text-slate-900 font-bold mr-1">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
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
                ? "bg-blue-600 text-white shadow-xs font-bold"
                : "bg-white border border-slate-200/90 text-slate-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 shadow-xs"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* ── Main Tabbed Search Box (CarDekho / CarWale style) ── */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-3.5 sm:p-6 shadow-xl shadow-slate-200/50 space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 border-b border-slate-100 pb-3">
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
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Innova Crysta, Swift VXi, Creta Diesel, City..."
                  aria-label="Search car model or make"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
                />
              </div>

              <Button
                type="submit"
                size="md"
                className="w-full sm:w-auto px-6 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20"
              >
                <Search className="w-4 h-4" />
                <span>Search Cars</span>
              </Button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-500 pt-1">
              <span className="font-semibold text-slate-700">Popular Searches:</span>
              {["Innova Crysta", "Hyundai Creta", "Maruti Swift", "Honda City", "Tata Nexon"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setSearchQuery(item);
                    router.push(`/used-cars?q=${encodeURIComponent(item)}`);
                  }}
                  className="rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 px-2 py-0.5 transition-colors cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </form>
        )}

        {/* Tab 2: By Budget */}
        {activeTab === "budget" && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <p className="text-xs text-slate-500 text-center">
              Select your budget range in Indian Rupees (₹)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {BUDGET_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    router.push(`/used-cars?budgetMin=${preset.min}&budgetMax=${preset.max}`);
                  }}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50 p-3 text-center hover:border-blue-500 hover:bg-blue-50/60 transition-all cursor-pointer group"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block">
                    {preset.label}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Verified listings &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: By Body Type */}
        {activeTab === "body" && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <p className="text-xs text-slate-500 text-center">
              Choose vehicle body style suited for Andhra Pradesh highways and city roads
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BODY_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    router.push(`/used-cars?bodyType=${type.id}`);
                  }}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50 p-3 text-center hover:border-blue-500 hover:bg-blue-50/60 transition-all cursor-pointer group"
                >
                  <Car className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block">
                    {type.label}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    Explore &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: By Brand */}
        {activeTab === "brand" && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <p className="text-xs text-slate-500 text-center">
              Verified inventory by India&apos;s leading automobile manufacturers
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {POPULAR_INDIAN_MAKES.map((make) => (
                <button
                  key={make}
                  type="button"
                  onClick={() => {
                    router.push(`/used-cars?make=${encodeURIComponent(make)}`);
                  }}
                  className="rounded-xl border border-slate-200/80 bg-slate-50 py-2.5 px-3 text-center hover:border-blue-500 hover:bg-blue-50/60 transition-all cursor-pointer group"
                >
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block">
                    {make}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
