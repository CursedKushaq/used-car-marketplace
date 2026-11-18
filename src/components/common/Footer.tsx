import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Lock, FileText, CheckCircle2 } from "lucide-react";
import { MAJOR_INDIAN_CITIES, POPULAR_INDIAN_MAKES } from "@/server/modules/catalog/data";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-muted/15 bg-surface text-ink mt-20">
      {/* ── Trust Banner ────────────────────────────────── */}
      <div className="border-b border-muted/10 bg-canvas/60 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-ink">5-Point Verification Ladder</h4>
                <p className="text-xs text-muted mt-0.5">
                  Every check is labeled: Declared, Document Seen, or Partner Checked.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-ink">Unbiased Price Ratings</h4>
                <p className="text-xs text-muted mt-0.5">
                  Algorithm compares asking prices against regional market comparables.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="p-2.5 rounded-xl bg-orange-50 text-orange-700 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-ink">Private-by-Default Enquiries</h4>
                <p className="text-xs text-muted mt-0.5">
                  Seller numbers revealed only after verified OTP; zero lead spam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Links Grid ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-ink">
                AutoBazaar
              </span>
            </Link>
            <p className="mt-3 text-xs text-muted leading-relaxed max-w-sm">
              India&apos;s trust-first used car marketplace. Empowering buyers and sellers with objective price transparency, 160-point inspection data, and privacy-first contact.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-muted">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Certified Inspection & Fair Pricing Standards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/used-cars" className="text-muted hover:text-ink">
                  Browse All Cars
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-muted hover:text-ink">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-muted hover:text-ink">
                  Compare Vehicles
                </Link>
              </li>
              <li>
                <Link href="/account/saved" className="text-muted hover:text-ink">
                  Saved Shortlist
                </Link>
              </li>
              <li>
                <Link href="/dealers" className="text-muted hover:text-ink">
                  Verified Dealers
                </Link>
              </li>
              <li>
                <Link href="/dealer" className="text-muted hover:text-ink">
                  Dealer Portal Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-3">
              Used Cars by City
            </h4>
            <ul className="space-y-2 text-xs">
              {MAJOR_INDIAN_CITIES.slice(0, 6).map((city) => (
                <li key={city}>
                  <Link
                    href={`/used-cars?city=${encodeURIComponent(city)}`}
                    className="text-muted hover:text-ink transition-colors"
                  >
                    Used Cars in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Brands */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-3">
              Popular Brands
            </h4>
            <ul className="space-y-2 text-xs">
              {POPULAR_INDIAN_MAKES.slice(0, 6).map((make) => (
                <li key={make}>
                  <Link
                    href={`/used-cars?make=${encodeURIComponent(make)}`}
                    className="text-muted hover:text-ink transition-colors"
                  >
                    Used {make} Cars
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/how-we-verify" className="text-muted hover:text-ink">
                  How We Verify
                </Link>
              </li>
              <li>
                <Link href="/how-price-ratings-work" className="text-muted hover:text-ink">
                  Price Rating Methodology
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-muted hover:text-ink">
                  Scam & Fraud Safety
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted hover:text-ink">
                  RC Transfer & Advice
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-muted hover:text-ink">
                  Privacy Notice (DPDP)
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-muted hover:text-ink">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/grievance" className="text-muted hover:text-ink">
                  Grievance Redressal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Sub Footer & DPDP Notice ────────────────────── */}
        <div className="mt-12 pt-6 border-t border-muted/10 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <p>
            &copy; {new Date().getFullYear()} AutoBazaar Technologies India Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <span>DPDP Act 2025/2027 Compliant</span>
            <span>&bull;</span>
            <Link href="/legal/privacy" className="hover:underline">
              Your Data Rights
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
