import React from "react";
import type { Metadata } from "next";
import { searchListings } from "@/server/modules/listings/service";
import { SearchResultsView } from "@/components/listing/SearchResultsView";
import type { SearchFilters } from "@/server/modules/catalog/types";

interface CityPageProps {
  params: Promise<{ city: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city).replace(/-/g, " ");
  const formattedCity =
    decodedCity.charAt(0).toUpperCase() + decodedCity.slice(1);

  return {
    title: `Verified Used Cars in ${formattedCity}`,
    description: `Browse verified used cars for sale in ${formattedCity} with 5-point verification ladders, 160-point mechanical inspection reports, and objective market price ratings.`,
  };
}

export async function generateStaticParams() {
  return [
    { city: "visakhapatnam" },
    { city: "vijayawada" },
    { city: "guntur" },
    { city: "tirupati" },
    { city: "rajahmundry" },
    { city: "delhi-ncr" },
    { city: "mumbai" },
    { city: "bengaluru" },
    { city: "hyderabad" },
  ];
}

export default async function CityUsedCarsPage({
  params,
  searchParams,
}: CityPageProps) {
  const { city } = await params;
  const resolvedParams = await searchParams;

  const decodedCity = decodeURIComponent(city).replace(/-/g, " ");

  const toArray = (val?: string | string[]): string[] | undefined => {
    if (!val) return undefined;
    return Array.isArray(val) ? val : [val];
  };

  const filters: SearchFilters = {
    city: decodedCity,
    query: typeof resolvedParams.q === "string" ? resolvedParams.q : undefined,
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
