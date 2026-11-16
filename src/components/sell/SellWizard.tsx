"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatCurrency, formatPriceCompact, formatKm } from "@/lib/format";
import { POPULAR_INDIAN_MAKES, MAJOR_INDIAN_CITIES, BODY_TYPES } from "@/server/modules/catalog/data";
import { Button } from "../ui/Button";
import {
  Car,
  FileCheck,
  Camera,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Sparkles,
} from "lucide-react";

export const SellWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  // Step 1: Basics
  const [make, setMake] = useState("Maruti Suzuki");
  const [model, setModel] = useState("Swift");
  const [variant, setVariant] = useState("ZXi Plus");
  const [year, setYear] = useState(2021);
  const [city, setCity] = useState("Delhi NCR");
  const [locality, setLocality] = useState("South Extension");
  const [km, setKm] = useState(28000);
  const [fuel, setFuel] = useState("petrol");
  const [transmission, setTransmission] = useState("manual");
  const [owners, setOwners] = useState(1);

  // Step 2: Condition & Paperwork
  const [accidentHistory, setAccidentHistory] = useState("none");
  const [floodDamaged, setFloodDamaged] = useState(false);
  const [serviceHistory, setServiceHistory] = useState("full");
  const [rcAvailable, setRcAvailable] = useState(true);
  const [loanStatus, setLoanStatus] = useState("None (Fully Owned)");

  // Step 3: Photos (mock photo uploads)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
  ]);

  // Step 4: Pricing & Valuation
  const [askingPrice, setAskingPrice] = useState(640000);

  // Step 5: Verification & Seller details
  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerConsent, setSellerConsent] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic Rule-based Valuation Estimate
  const calculateValuation = () => {
    let base = 750000;
    if (make === "Maruti Suzuki") base = 650000;
    if (make === "Hyundai") base = 720000;
    if (make === "Mahindra") base = 1200000;
    if (make === "Tata") base = 850000;

    const currentYear = 2026;
    const age = currentYear - year;
    const ageDepreciation = Math.pow(0.9, age);
    const kmDepreciation = Math.max(0.7, 1 - (km / 100000) * 0.2);
    const estimated = Math.round(base * ageDepreciation * kmDepreciation);

    return {
      low: Math.round(estimated * 0.93),
      high: Math.round(estimated * 1.05),
      mid: estimated,
    };
  };

  const valuation = calculateValuation();

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerConsent) {
      alert("Please accept the seller agreement and consent to continue.");
      return;
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-ink">Listing Submitted for Review!</h2>
        <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
          Your listing for the <strong>{year} {make} {model} {variant}</strong> has been received. Our automated checks are cross-referencing your registration data with Parivahan.
        </p>
        <div className="p-4 rounded-xl bg-canvas border border-muted/15 max-w-sm mx-auto text-left text-xs space-y-1.5">
          <p className="font-bold text-ink">Next Steps:</p>
          <p className="text-muted">&bull; Listing reviewed within 2 hours.</p>
          <p className="text-muted">&bull; Price rating calculated against local comparables.</p>
          <p className="text-muted">&bull; Direct buyer inquiries routed to your private inbox.</p>
        </div>
        <Link href="/used-cars">
          <Button className="mt-4">Browse Marketplace</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* ── Wizard Stepper ────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-muted">
          <span>Step {step} of 5</span>
          <span>
            {step === 1 && "Car Details"}
            {step === 2 && "Condition & Paperwork"}
            {step === 3 && "Photos"}
            {step === 4 && "Valuation & Price"}
            {step === 5 && "Verification"}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-canvas overflow-hidden border border-muted/10">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-muted/20 bg-surface p-6 sm:p-8 shadow-xs">
        {/* ── Step 1: Car Basics ───────────────────────── */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-ink">Vehicle Basics</h2>
              <p className="text-xs text-muted mt-0.5">
                Tell us about the car you want to sell
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Make / Brand</label>
                <select
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                >
                  {POPULAR_INDIAN_MAKES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Model Name</label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. Swift, Creta, Thar..."
                  className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Variant / Trim</label>
                <input
                  type="text"
                  required
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  placeholder="e.g. ZXi Plus, SX(O)..."
                  className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Manufacturing Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                >
                  {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Kilometres Driven</label>
                <input
                  type="number"
                  required
                  min={0}
                  max={500000}
                  value={km}
                  onChange={(e) => setKm(Number(e.target.value))}
                  className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Owners Count</label>
                <select
                  value={owners}
                  onChange={(e) => setOwners(Number(e.target.value))}
                  className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                >
                  <option value={1}>1st Owner (Single hand)</option>
                  <option value={2}>2nd Owner</option>
                  <option value={3}>3rd Owner</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                >
                  {MAJOR_INDIAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">Locality / Area</label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Indiranagar, Bandra West..."
                  className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-muted/15">
              <Button type="submit" className="gap-2">
                <span>Continue to Condition</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}

        {/* ── Step 2: Condition & Paperwork ───────────── */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-ink">Condition &amp; Paperwork</h2>
              <p className="text-xs text-muted mt-0.5">
                Honest condition reporting builds buyer confidence and speeds up sales
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink block mb-1">
                  Accidental History
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "none", label: "No Accidents (Original Paint)" },
                    { id: "minor", label: "Minor Scuffs / Bumper repainted" },
                    { id: "major", label: "Major repair history" },
                  ].map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => setAccidentHistory(acc.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        accidentHistory === acc.id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-muted/20 bg-surface text-ink hover:bg-canvas"
                      }`}
                    >
                      {acc.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">
                  Service History Record
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "full", label: "Full Authorized OEM Records" },
                    { id: "partial", label: "Partial Service Records" },
                    { id: "none", label: "Serviced at Local Garage" },
                  ].map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setServiceHistory(srv.id)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                        serviceHistory === srv.id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-muted/20 bg-surface text-ink hover:bg-canvas"
                      }`}
                    >
                      {srv.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink block mb-1">
                  Bank Loan / Hypothecation Status
                </label>
                <select
                  value={loanStatus}
                  onChange={(e) => setLoanStatus(e.target.value)}
                  className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                >
                  <option value="None (Fully Owned)">None (Fully Owned / Cash Purchase)</option>
                  <option value="Cleared (NOC Available)">Loan Cleared (Bank NOC in hand)</option>
                  <option value="Active Loan">Active Loan (Bank foreclosure required)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-muted/15">
              <Button type="button" variant="secondary" onClick={handlePrevStep} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button type="submit" className="gap-2">
                <span>Continue to Photos</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}

        {/* ── Step 3: Guided Photos ───────────────────── */}
        {step === 3 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-ink">Guided Photo Uploads</h2>
              <p className="text-xs text-muted mt-0.5">
                Upload clear daytime photos. Listings with 6+ quality photos receive 4x more serious enquiries.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                "Front 3/4 View",
                "Rear Profile",
                "Driver Side",
                "Cabin & Dashboard",
                "Odometer Cluster",
                "Engine Bay",
                "Boot Space",
                "Imperfections",
              ].map((angle, idx) => (
                <div
                  key={angle}
                  className="rounded-xl border border-dashed border-muted/30 bg-canvas p-4 text-center space-y-2 hover:border-primary transition-colors cursor-pointer"
                >
                  <Camera className="w-6 h-6 text-muted mx-auto" />
                  <p className="text-xs font-bold text-ink">{angle}</p>
                  <span className="text-[10px] text-muted block">Click to upload</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4 border-t border-muted/15">
              <Button type="button" variant="secondary" onClick={handlePrevStep} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button type="submit" className="gap-2">
                <span>Continue to Valuation</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}

        {/* ── Step 4: Valuation & Asking Price ────────── */}
        {step === 4 && (
          <form onSubmit={handleNextStep} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-ink">Market Valuation &amp; Pricing</h2>
              <p className="text-xs text-muted mt-0.5">
                Set a competitive asking price based on live market benchmark comparables
              </p>
            </div>

            {/* Valuation Card */}
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-canvas border border-primary/20 p-5 space-y-3">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Estimated Market Range</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-ink font-tabular">
                  {formatPriceCompact(valuation.low)} &ndash; {formatPriceCompact(valuation.high)}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Based on asking prices for similar <strong>{year} {make} {model}</strong> listings in <strong>{city}</strong> with approximately <strong>{formatKm(km)}</strong>.
              </p>
            </div>

            <div>
              <label htmlFor="asking-price-inr" className="text-xs font-semibold text-ink block mb-1">
                Your Asking Price (₹)
              </label>
              <input
                id="asking-price-inr"
                type="number"
                step={5000}
                required
                value={askingPrice}
                onChange={(e) => setAskingPrice(Number(e.target.value))}
                aria-label="Your asking price in rupees"
                className="w-full text-lg font-bold rounded-xl border border-muted/20 bg-surface p-3 text-ink focus:border-primary focus:outline-none"
              />
              <p className="text-xs text-muted mt-1">
                Formatted: <strong>{formatPriceCompact(askingPrice)}</strong> ({formatCurrency(askingPrice)})
              </p>
            </div>

            <div className="flex justify-between pt-4 border-t border-muted/15">
              <Button type="button" variant="secondary" onClick={handlePrevStep} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button type="submit" className="gap-2">
                <span>Continue to Verification</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        )}

        {/* ── Step 5: Verification & Publish ──────────── */}
        {step === 5 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-ink">Seller Verification</h2>
              <p className="text-xs text-muted mt-0.5">
                Verify your contact details. Your number remains masked until verified buyers submit an inquiry.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="seller-full-name" className="text-xs font-semibold text-ink block mb-1">
                  Seller Full Name
                </label>
                <input
                  id="seller-full-name"
                  type="text"
                  required
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full rounded-xl border border-muted/20 bg-surface p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="seller-phone-number" className="text-xs font-semibold text-ink block mb-1">
                  Mobile Number (for OTP verification)
                </label>
                <div className="flex rounded-xl border border-muted/20 bg-surface overflow-hidden">
                  <span className="flex items-center bg-canvas px-3 text-xs font-bold text-muted border-r border-muted/20">
                    +91
                  </span>
                  <input
                    id="seller-phone-number"
                    type="tel"
                    required
                    maxLength={10}
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full p-2.5 text-xs text-ink focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-muted/10 space-y-2">
                <label className="flex items-start gap-2.5 text-xs text-muted cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={sellerConsent}
                    onChange={(e) => setSellerConsent(e.target.checked)}
                    className="mt-0.5 rounded border-muted/30 text-primary focus:ring-primary h-4 w-4"
                  />
                  <span>
                    I confirm that I am the legal owner or authorized dealer of this vehicle and that the details provided are true and accurate. I accept the AutoBazaar Seller Terms.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-muted/15">
              <Button type="button" variant="secondary" onClick={handlePrevStep} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <Button type="submit" className="gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Listing for Review</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
