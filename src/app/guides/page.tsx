import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Used Car Buying & Paperwork Guides — AutoBazaar",
  description:
    "Expert India-specific guides on RC transfer, Form 29 & 30, hypothecation removal, insurance transfer, and pre-purchase inspection checklists.",
};

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <div className="border-b border-muted/15 pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
          Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
          Used Car Buyer Guides &amp; Paperwork Advice
        </h1>
        <p className="text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
          Unbiased, India-specific guides to navigate Parivahan RTO formalities, avoid scam sellers, and inspect mechanical components with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group rounded-2xl border border-muted/15 bg-surface p-6 space-y-3 hover:border-primary hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                  {guide.category}
                </span>
                <span className="text-muted">{guide.readTime}</span>
              </div>
              <h2 className="font-bold text-base text-ink group-hover:text-primary transition-colors">
                {guide.title}
              </h2>
              <p className="text-xs text-muted leading-relaxed line-clamp-3">
                {guide.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-muted/10 flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
              <span>Read complete guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
