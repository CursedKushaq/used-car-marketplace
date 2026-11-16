import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldAlert,
  AlertTriangle,
  Lock,
  CheckCircle2,
  FileCheck,
  Eye,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Safety & Scam Awareness Guide — AutoBazaar",
  description:
    "Protect yourself against used car scams in India: advance token fraud, fake military postings, and odometer rollback scams.",
};

export default function SafetyPage() {
  const commonScams = [
    {
      title: "1. The Advance Booking Token Scam",
      desc: "A seller claims multiple buyers are queuing up and demands a ₹5,000 to ₹25,000 UPI transfer to 'hold' the car. Once you send money, their phone is switched off.",
      advice: "NEVER transfer advance money, booking tokens, or gate passes before inspecting the vehicle in person.",
    },
    {
      title: "2. The Fake Armed Forces / Transfer Scam",
      desc: "Scammers pretend to be Army, CISF, or Air Force officers posted to remote locations (e.g. airport or border post) claiming the car will be shipped via military courier upon paying clearance fees.",
      advice: "Legitimate sellers meet you in person. AutoBazaar does not support courier delivery or remote escrow.",
    },
    {
      title: "3. Odometer Rollback & Meter Tampering",
      desc: "Unscrupulous dealers roll back digital odometers from 90,000 km to 35,000 km to inflate asking prices by lakhs of rupees.",
      advice: "Check steering wheel wear, pedal rubber, tyre manufacturing year, and request authorized brand service network history.",
    },
    {
      title: "4. The Reverse UPI Payment / QR Code Scam",
      desc: "A buyer contacts you saying they want to buy your car immediately and sends a 'pay request' QR code asking you to enter your UPI PIN to 'receive' money.",
      advice: "You never need to enter your UPI PIN to receive money. A UPI PIN is ONLY used to authorize deductions.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-danger bg-danger/10 px-3 py-1 rounded-full">
          Scam Defense
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-ink tracking-tight">
          Used Car Safety &amp; Scam Prevention
        </h1>
        <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
          Stay vigilant. Buying or selling a car involves significant financial stakes. Review these golden safety rules before meeting any buyer or seller.
        </p>
      </div>

      {/* 4 Golden Rules */}
      <div className="rounded-2xl border border-muted/20 bg-surface p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold text-ink flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>The 4 Golden Rules of Safe Buying</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-canvas border border-muted/10 space-y-1">
            <h4 className="font-bold text-xs text-ink">Rule 1: In-Person Daytime Viewings</h4>
            <p className="text-xs text-muted">
              Always inspect the car during daylight in public places (e.g. fuel station, mall parking, or verified dealership).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-canvas border border-muted/10 space-y-1">
            <h4 className="font-bold text-xs text-ink">Rule 2: Zero Advance Transfers</h4>
            <p className="text-xs text-muted">
              Never pay advance booking amounts online. Final payments should only happen after completing test drive and checking documents.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-canvas border border-muted/10 space-y-1">
            <h4 className="font-bold text-xs text-ink">Rule 3: Match Physical Chassis Numbers</h4>
            <p className="text-xs text-muted">
              Compare the 17-character VIN stamped on the engine bay firewall and under the driver seat against the original RC.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-canvas border border-muted/10 space-y-1">
            <h4 className="font-bold text-xs text-ink">Rule 4: Execute Form 29 &amp; 30</h4>
            <p className="text-xs text-muted">
              Ensure both seller and buyer sign Parivahan RTO sale intimation documents at the exact moment of vehicle handover.
            </p>
          </div>
        </div>
      </div>

      {/* Common Scams to Avoid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-ink">Watch Out for Common Scams</h2>

        <div className="space-y-4">
          {commonScams.map((scam) => (
            <div
              key={scam.title}
              className="rounded-2xl border border-muted/15 bg-surface p-6 space-y-2"
            >
              <h3 className="font-bold text-sm text-ink">{scam.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{scam.desc}</p>
              <div className="p-3 rounded-xl bg-danger/5 border border-danger/20 text-xs text-danger font-medium mt-2">
                <strong>Safety Rule:</strong> {scam.advice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Suspicious Seller */}
      <div className="rounded-2xl border border-muted/20 bg-canvas p-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-danger font-bold text-base">
          <Flag className="w-5 h-5" />
          <span>Found a Suspicious Listing?</span>
        </div>
        <p className="text-xs text-muted max-w-md mx-auto">
          Every vehicle detail page has a &ldquo;Report Listing&rdquo; button. If any seller demands an advance transfer, flag the listing immediately for priority moderation review.
        </p>
      </div>
    </div>
  );
}
