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
    <header className="sticky top-0 z-40 border-b border-muted/15 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & City Picker */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-ink group-hover:text-primary transition-colors">
                AutoBazaar
              </span>
              <span className="hidden sm:inline-block text-[10px] text-primary font-bold uppercase tracking-widest ml-1 px-1.5 py-0.2 rounded bg-primary/10">
                Verified
              </span>
            </div>
          </Link>

          {/* City Quick Picker */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted font-medium bg-canvas border border-muted/15 rounded-xl px-2.5 py-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
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
              className="bg-transparent text-ink font-semibold focus:outline-none cursor-pointer"
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
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-ink ${
                  active ? "text-primary font-semibold" : ""
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
            className="relative p-2 text-muted hover:text-red-500 transition-colors rounded-xl hover:bg-canvas"
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
            className="relative p-2 text-muted hover:text-primary transition-colors rounded-xl hover:bg-canvas"
            title="Compare vehicles"
          >
            <GitCompare className="w-5 h-5" />
            {compareIds.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-xs">
                {compareIds.length}
              </span>
            )}
          </Link>

          {/* Sell Car CTA */}
          <Link href="/sell" className="hidden sm:inline-flex">
            <Button size="sm" className="gap-1.5">
              <PlusCircle className="w-4 h-4" />
              <span>Sell Car</span>
            </Button>
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-muted hover:text-ink rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-muted/15 bg-surface px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="py-2 border-b border-muted/10">
            <label className="text-xs text-muted block mb-1">Select City:</label>
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
              className="w-full bg-canvas border border-muted/20 rounded-xl p-2.5 text-sm font-semibold text-ink"
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
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-canvas transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/account/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-canvas transition-colors"
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
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-canvas transition-colors"
            >
              <span className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-primary" />
                <span>Compare Vehicles</span>
              </span>
              {compareIds.length > 0 && (
                <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-bold">
                  {compareIds.length}
                </span>
              )}
            </Link>

            <Link
              href="/dealer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-canvas transition-colors"
            >
              <Building2 className="w-4 h-4 text-muted" />
              <span>Dealer Console</span>
            </Link>

            <Link
              href="/safety"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-ink hover:bg-canvas transition-colors"
            >
              <Shield className="w-4 h-4 text-muted" />
              <span>Safety &amp; Fraud Guide</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-muted/10 flex flex-col gap-2">
            <Link href="/sell/new" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center">Start Listing Your Car</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
