import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Lock, FileText, CheckCircle2 } from "lucide-react";
import { MAJOR_INDIAN_CITIES, POPULAR_INDIAN_MAKES } from "@/server/modules/catalog/data";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#0B1120] text-slate-300 mt-20">
      {/* ── Trust Banner ────────────────────────────────── */}
      <div className="border-b border-slate-800/80 bg-[#0F172A] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">5-Point Verification Ladder</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Every check is labeled: Declared, Document Seen, or Partner Checked.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Unbiased Price Ratings</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Algorithm compares asking prices against regional AP market comparables.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Private-by-Default Enquiries</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Seller numbers revealed only after verified OTP; zero telemarketing spam.
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
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                AutoBazaar
              </span>
            </Link>
            <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-sm">
              India&apos;s trust-first used car marketplace. Empowering Andhra Pradesh dealers and buyers with objective price transparency, 160-point inspection data, and privacy-first contact.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-medium">Certified Inspection &amp; Fair Pricing Standards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/used-cars" className="text-slate-400 hover:text-white transition-colors">
                  Browse All Cars
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-slate-400 hover:text-white transition-colors">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-slate-400 hover:text-white transition-colors">
                  Compare Vehicles
                </Link>
              </li>
              <li>
                <Link href="/account/saved" className="text-slate-400 hover:text-white transition-colors">
                  Saved Shortlist
                </Link>
              </li>
              <li>
                <Link href="/dealers" className="text-slate-400 hover:text-white transition-colors">
                  Verified AP Dealers
                </Link>
              </li>
              <li>
                <Link href="/dealer" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Dealer Portal Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
              Used Cars by City
            </h4>
            <ul className="space-y-2 text-xs">
              {MAJOR_INDIAN_CITIES.slice(0, 6).map((city) => (
                <li key={city}>
                  <Link
                    href={`/used-cars?city=${encodeURIComponent(city)}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Used Cars in {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Brands */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
              Popular Brands
            </h4>
            <ul className="space-y-2 text-xs">
              {POPULAR_INDIAN_MAKES.slice(0, 6).map((make) => (
                <li key={make}>
                  <Link
                    href={`/used-cars?make=${encodeURIComponent(make)}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Used {make} Cars
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/how-we-verify" className="text-slate-400 hover:text-white transition-colors">
                  How We Verify
                </Link>
              </li>
              <li>
                <Link href="/how-price-ratings-work" className="text-slate-400 hover:text-white transition-colors">
                  Price Rating Methodology
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-slate-400 hover:text-white transition-colors">
                  Scam &amp; Fraud Safety
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-slate-400 hover:text-white transition-colors">
                  RC Transfer &amp; Advice
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Notice (DPDP)
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/grievance" className="text-slate-400 hover:text-white transition-colors">
                  Grievance Redressal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Sub Footer & DPDP Notice ────────────────────── */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} AutoBazaar Technologies India Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <span>DPDP Act 2025/2027 Compliant</span>
            <span>&bull;</span>
            <Link href="/legal/privacy" className="hover:text-slate-300 transition-colors">
              Your Data Rights
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
