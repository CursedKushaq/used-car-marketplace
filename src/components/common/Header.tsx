"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCompare } from "../compare/CompareContext";
import { MAJOR_INDIAN_CITIES } from "@/server/modules/catalog/data";
import {
  ShieldCheck,
  Search,
  PlusCircle,
  Menu,
  X,
  MapPin,
  GitCompare,
  Heart,
  User,
  Shield,
  FileText,
  Building2,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/Button";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { compareIds } = useCompare();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("All India");
  const [savedCount, setSavedCount] = useState<number>(0);

  useEffect(() => {
    const updateSavedCount = () => {
      try {
        const stored = localStorage.getItem("autobazaar_saved_cars");
        if (stored) {
          const ids = JSON.parse(stored);
          setSavedCount(Array.isArray(ids) ? ids.length : 0);
        } else {
          setSavedCount(0);
        }
      } catch {
        setSavedCount(0);
      }
    };

    updateSavedCount();
    window.addEventListener("autobazaar_saved_updated", updateSavedCount);
    window.addEventListener("storage", updateSavedCount);
    return () => {
      window.removeEventListener("autobazaar_saved_updated", updateSavedCount);
      window.removeEventListener("storage", updateSavedCount);
    };
  }, []);

  const navLinks = [
    { label: "Browse Cars", href: "/used-cars" },
    { label: "Sell Your Car", href: "/sell" },
    { label: "Dealers", href: "/dealers" },
    { label: "How We Verify", href: "/how-we-verify" },
    { label: "Price Ratings", href: "/how-price-ratings-work" },
    { label: "Guides", href: "/guides" },
  ];

  return (
    <div className="sticky top-0 z-40">
      {/* ── Top Micro-Bar (Modern Slate Anchor) ──────────── */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 font-medium border-b border-slate-800">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              Andhra Pradesh&apos;s Verified Dealer Network &bull; Visakhapatnam &bull; Vijayawada &bull; Guntur &bull; Tirupati
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 shrink-0 text-slate-400">
            <Link
              href="/dealers"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Building2 className="w-3 h-3 text-blue-400" />
              <span>Showroom Directory</span>
            </Link>
            <span>&bull;</span>
            <Link
              href="/dealer"
              className="hover:text-white transition-colors font-semibold text-blue-400"
            >
              Dealer Portal
            </Link>
            <span>&bull;</span>
            <a
              href="https://wa.me/919848091822"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>AP Dealer Helpline</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar (Clean Ceramic / Porcelain) ─ */}
      <header className="border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand & City Picker */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  AutoBazaar
                </span>
                <span className="hidden sm:inline-block text-[10px] text-blue-700 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-200/80">
                  AP Verified
                </span>
              </div>
            </Link>

            {/* City Quick Picker */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 font-medium bg-slate-50 border border-slate-200/90 rounded-xl px-2.5 py-1.5 hover:border-blue-400 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  if (e.target.value === "All India") {
                    window.location.href = "/used-cars";
                  } else {
                    window.location.href = `/used-cars?city=${encodeURIComponent(
                      e.target.value
                    )}`;
                  }
                }}
                aria-label="Select city"
                className="bg-transparent text-slate-900 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="All India">All India</option>
                {MAJOR_INDIAN_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-blue-600 ${
                    active ? "text-blue-600 font-bold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saved Cars Link */}
            <Link
              href="/account/saved"
              className="relative p-2 text-slate-600 hover:text-red-500 transition-colors rounded-xl hover:bg-slate-100"
              title="Saved vehicles"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? "fill-red-500 text-red-500" : ""}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                  {savedCount}
                </span>
              )}
            </Link>

            {/* Compare Link */}
            <Link
              href={
                compareIds.length > 0
                  ? `/compare?ids=${compareIds.join(",")}`
                  : "/compare"
              }
              className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-slate-100"
              title="Compare vehicles"
            >
              <GitCompare className="w-5 h-5" />
              {compareIds.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-xs">
                  {compareIds.length}
                </span>
              )}
            </Link>

            {/* Sell Car CTA */}
            <Link href="/sell" className="hidden sm:inline-flex">
              <Button size="sm" className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20">
                <PlusCircle className="w-4 h-4" />
                <span>Sell Car</span>
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/90 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
            <div className="py-2 border-b border-slate-100">
              <label className="text-xs text-slate-500 block mb-1">Select City:</label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setMobileMenuOpen(false);
                  if (e.target.value === "All India") {
                    window.location.href = "/used-cars";
                  } else {
                    window.location.href = `/used-cars?city=${encodeURIComponent(
                      e.target.value
                    )}`;
                  }
                }}
                className="w-full bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 text-sm font-semibold text-slate-900"
              >
                <option value="All India">All India</option>
                {MAJOR_INDIAN_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/account/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Saved Vehicles</span>
                </span>
                {savedCount > 0 && (
                  <span className="rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs font-bold">
                    {savedCount}
                  </span>
                )}
              </Link>

              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GitCompare className="w-4 h-4 text-blue-600" />
                  <span>Compare Vehicles</span>
                </span>
                {compareIds.length > 0 && (
                  <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-bold">
                    {compareIds.length}
                  </span>
                )}
              </Link>

              <Link
                href="/dealer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>Dealer Console</span>
              </Link>

              <Link
                href="/safety"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                <Shield className="w-4 h-4 text-slate-500" />
                <span>Safety &amp; Fraud Guide</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link href="/sell/new" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white">Start Listing Your Car</Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
