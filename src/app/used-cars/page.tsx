import React from "react";
import type { Metadata } from "next";
import { searchListings } from "@/server/modules/listings/service";
import { SearchResultsView } from "@/components/listing/SearchResultsView";
import type { SearchFilters } from "@/server/modules/catalog/types";

export const metadata: Metadata = {
  title: "Browse Used Cars in India",
  description:
    "Explore verified second-hand cars across Delhi NCR, Mumbai, Bengaluru, Hyderabad, and more with objective market price ratings and 160-point inspection reports.",
};

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function UsedCarsPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;

  const toArray = (val?: string | string[]): string[] | undefined => {
    if (!val) return undefined;
    return Array.isArray(val) ? val : [val];
  };

  const filters: SearchFilters = {
    query: typeof resolvedParams.q === "string" ? resolvedParams.q : undefined,
    city: typeof resolvedParams.city === "string" ? resolvedParams.city : undefined,
    make: toArray(resolvedParams.make),
    model: toArray(resolvedParams.model),
    bodyType: toArray(resolvedParams.bodyType) as any,
    fuel: toArray(resolvedParams.fuel) as any,
    transmission: toArray(resolvedParams.transmission) as any,
    budgetMin: resolvedParams.budgetMin ? Number(resolvedParams.budgetMin) : undefined,
    budgetMax: resolvedParams.budgetMax ? Number(resolvedParams.budgetMax) : undefined,
    kmMax: resolvedParams.kmMax ? Number(resolvedParams.kmMax) : undefined,
    owners: resolvedParams.owners
      ? (toArray(resolvedParams.owners)?.map(Number) as any)
      : undefined,
    sellerType: toArray(resolvedParams.sellerType) as any,
    verificationLevel: toArray(resolvedParams.verificationLevel) as any,
    priceRating: toArray(resolvedParams.priceRating) as any,
    sort: typeof resolvedParams.sort === "string" ? (resolvedParams.sort as any) : "relevance",
    page: resolvedParams.page ? Number(resolvedParams.page) : 1,
    limit: 12,
  };

  const results = await searchListings(filters);

  return <SearchResultsView initialResults={results} />;
}
