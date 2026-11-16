"use client";

import React, { useState } from "react";
import type { CarListing } from "@/server/modules/catalog/types";
import { formatCurrency, formatPriceCompact } from "@/lib/format";
import {
  X,
  ShieldCheck,
  Phone,
  CheckCircle2,
  Lock,
  AlertTriangle,
  ArrowRight,
  Eye,
} from "lucide-react";
import { Button } from "../ui/Button";

interface EnquiryModalProps {
  listing: CarListing;
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  listing,
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<"form" | "otp" | "revealed">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    "Hi, I am interested in this vehicle. Is it still available for a viewing?"
  );
  const [consentShare, setConsentShare] = useState(false);
  const [consentUpdates, setConsentUpdates] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate phone: 10 Indian digits
    const cleanedPhone = phone.replace(/\D/g, "");
    if (cleanedPhone.length !== 10 || !["6", "7", "8", "9"].includes(cleanedPhone[0])) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!consentShare) {
      setError(
        "Consent to share contact details with the seller is required to process your enquiry."
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("otp");
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.length < 4) {
      setError("Please enter the 4 or 6-digit OTP sent to your phone (demo OTP: 1234).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("revealed");
    }, 400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-surface p-6 shadow-2xl border border-muted/20 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-muted/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 id="enquiry-modal-title" className="font-bold text-ink text-base">
                {step === "revealed" ? "Seller Contact Details" : "Contact Seller"}
              </h3>
              <p className="text-xs text-muted">
                {listing.title} &bull; {formatPriceCompact(listing.priceInr)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted hover:text-ink cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Step 1: Enquiry Form ────────────────────── */}
        {step === "form" && (
          <form onSubmit={handleSendOtp} className="mt-5 space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-xs text-danger font-medium">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="enquirer-name" className="text-xs font-semibold text-ink block mb-1">
                Your Full Name
              </label>
              <input
                id="enquirer-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-muted/20 bg-surface px-3.5 py-2.5 text-sm text-ink focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="enquirer-phone" className="text-xs font-semibold text-ink block mb-1">
                Mobile Number (for instant OTP verification)
              </label>
              <div className="flex rounded-xl border border-muted/20 bg-surface overflow-hidden focus-within:border-primary">
                <span className="flex items-center bg-canvas px-3 text-xs font-bold text-muted border-r border-muted/20">
                  +91
                </span>
                <input
                  id="enquirer-phone"
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full px-3.5 py-2.5 text-sm text-ink focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="enquiry-message" className="text-xs font-semibold text-ink block mb-1">
                Message to Seller
              </label>
              <textarea
                id="enquiry-message"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-xl border border-muted/20 bg-surface p-3 text-xs text-ink focus:border-primary focus:outline-none"
              />
            </div>

            {/* Explicit DPDP Unticked Consent Checkboxes */}
            <div className="pt-2 border-t border-muted/10 space-y-2.5">
              <label className="flex items-start gap-2.5 text-xs text-muted cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={consentShare}
                  onChange={(e) => setConsentShare(e.target.checked)}
                  className="mt-0.5 rounded border-muted/30 text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
                <span className="leading-snug">
                  I give explicit consent under DPDP Act to share my name and verified phone number with <strong>{listing.seller.name}</strong> for this vehicle enquiry.
                </span>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-muted cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consentUpdates}
                  onChange={(e) => setConsentUpdates(e.target.checked)}
                  className="mt-0.5 rounded border-muted/30 text-primary focus:ring-primary h-4 w-4 shrink-0"
                />
                <span className="leading-snug">
                  Send OTP verification and viewing confirmation via SMS/WhatsApp.
                </span>
              </label>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
              {isSubmitting ? "Generating OTP..." : "Verify Mobile & Contact Seller"}
            </Button>
          </form>
        )}

        {/* ── Step 2: OTP Verification ────────────────── */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="mt-5 space-y-4">
            <div className="text-center py-2">
              <p className="text-sm font-semibold text-ink">Enter Verification Code</p>
              <p className="text-xs text-muted mt-1">
                A 4-digit code was sent to <strong>+91 {phone}</strong>
              </p>
              <p className="text-[11px] text-primary font-bold mt-1">
                (Demo mode: enter <strong>1234</strong> or any 4 digits)
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-xs text-danger font-medium">
                {error}
              </div>
            )}

            <div>
              <input
                type="text"
                autoFocus
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="• • • •"
                aria-label="Enter verification code"
                className="w-full text-center tracking-widest text-2xl font-bold rounded-xl border border-muted/20 bg-surface py-3 text-ink focus:border-primary focus:outline-none"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Verifying..." : "Confirm & Reveal Seller Contact"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="text-xs text-muted hover:text-ink underline"
              >
                Change Phone Number
              </button>
            </div>
          </form>
        )}

        {/* ── Step 3: Contact Revealed & Safety Advice ── */}
        {step === "revealed" && (
          <div className="mt-5 space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <h4 className="font-bold text-sm">Enquiry Sent Successfully!</h4>
              </div>
              <p className="text-xs leading-relaxed">
                The seller has been notified with your enquiry. Your lead has been logged in their dashboard.
              </p>

              <div className="p-3 rounded-lg bg-white border border-emerald-200 space-y-1">
                <p className="text-[11px] text-muted uppercase tracking-wider font-bold">
                  Seller Contact:
                </p>
                <p className="text-base font-bold text-ink">
                  {listing.seller.name}
                </p>
                <p className="text-sm font-bold text-primary font-mono">
                  +91 98201 45892
                </p>
                <p className="text-[11px] text-muted">
                  Median response time: ~{listing.seller.medianResponseHours} hours
                </p>
              </div>
            </div>

            {/* Buyer Safety Tips Banner */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>Buyer Safety Checklist:</span>
              </div>
              <ul className="text-xs space-y-1 list-disc list-inside text-amber-800">
                <li>Never transfer booking tokens or advance money before seeing the car in person.</li>
                <li>Meet in a safe, public daytime location.</li>
                <li>Check the original RC against the engine and chassis numbers physically stamped on the car.</li>
              </ul>
            </div>

            <Button onClick={onClose} variant="secondary" className="w-full">
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
