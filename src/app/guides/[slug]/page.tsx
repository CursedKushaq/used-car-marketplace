import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { ArrowLeft, BookOpen, Clock, ShieldCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return { title: "Guide Not Found" };
  }

  return {
    title: `${guide.title} — AutoBazaar Guides`,
    description: guide.excerpt,
  };
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div>
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all guides</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold text-muted mb-2">
          <span className="text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            {guide.category}
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {guide.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight">
          {guide.title}
        </h1>
        <p className="text-sm text-muted mt-3 leading-relaxed">{guide.excerpt}</p>
      </div>

      <div className="prose prose-sm sm:prose max-w-none rounded-2xl border border-muted/15 bg-surface p-6 sm:p-8 space-y-4 text-ink leading-relaxed">
        {guide.content.split("\n\n").map((block, idx) => {
          if (block.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-lg font-bold text-ink mt-6 mb-2">
                {block.replace("### ", "")}
              </h3>
            );
          }
          if (block.startsWith("1. ") || block.startsWith("- ")) {
            return (
              <div
                key={idx}
                className="whitespace-pre-line text-xs sm:text-sm text-muted space-y-1.5 pl-2"
              >
                {block}
              </div>
            );
          }
          return (
            <p key={idx} className="text-xs sm:text-sm text-muted leading-relaxed">
              {block}
            </p>
          );
        })}
      </div>

      <div className="pt-6 border-t border-muted/15 flex items-center justify-between">
        <Link href="/used-cars">
          <Button variant="secondary" size="sm">
            Browse Verified Cars
          </Button>
        </Link>
        <Link href="/how-we-verify">
          <Button size="sm">How We Verify</Button>
        </Link>
      </div>
    </article>
  );
}
