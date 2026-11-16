import React from "react";
import type { Metadata } from "next";
import { getListingsByIds } from "@/server/modules/listings/service";
import { ComparisonView } from "@/components/compare/ComparisonView";

export const metadata: Metadata = {
  title: "Compare Used Cars Side-by-Side",
  description:
    "Compare up to 4 used cars side-by-side with transparent specifications, market price ratings, and 5-point verification ladder differences.",
};

interface ComparePageProps {
  searchParams: Promise<{ ids?: string }>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { ids } = await searchParams;

  const idList = ids ? ids.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const cars = idList.length > 0 ? await getListingsByIds(idList) : [];

  return <ComparisonView cars={cars} />;
}
