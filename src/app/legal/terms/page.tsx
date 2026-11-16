import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — AutoBazaar",
  description: "Terms and conditions governing the use of AutoBazaar's used car marketplace platform in India.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-ink">
      <div className="border-b border-muted/15 pb-6 space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-ink">
          Terms of Service
        </h1>
        <p className="text-xs text-muted">
          Last updated: November 16, 2026 &bull; Platform Terms for Buyers &amp; Sellers
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink">1. Intermediary Status</h2>
          <p>
            AutoBazaar functions solely as an online marketplace intermediary under Section 79 of India&apos;s Information Technology Act, 2000. AutoBazaar does not take title, ownership, or physical possession of any motor vehicles listed on the platform. All sale-purchase contracts are executed directly and privately between buyers and independent sellers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink">2. Listing Truthfulness &amp; Seller Warranty</h2>
          <p>
            Sellers warrant that they are the registered legal owners or authorized commercial dealers of the vehicles listed, and that all declarations regarding accident history, flood immersion, odometer reading, and hypothecation status are complete and accurate. Submitting fraudulent registration papers or tampered odometers will result in immediate permanent banning and reporting to law enforcement authorities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink">3. Prohibition of Online Advance Payments</h2>
          <p>
            AutoBazaar does not process booking deposits, escrow holdings, or vehicle purchase prices online. Users are explicitly prohibited from soliciting advance token amounts through the platform. AutoBazaar assumes no liability for payments transferred directly between parties outside verified in-person inspections.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-ink">4. Governing Law &amp; Jurisdiction</h2>
          <p>
            These terms are governed by the laws of India. Any disputes arising out of or in connection with the platform shall be subject to the exclusive jurisdiction of the competent courts in New Delhi.
          </p>
        </section>
      </div>
    </div>
  );
}
