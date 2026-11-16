import { NextResponse } from "next/server";
import { searchListings } from "@/server/modules/listings/service";
import type { SearchFilters } from "@/server/modules/catalog/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const toArray = (key: string): string[] | undefined => {
    const all = searchParams.getAll(key);
    return all.length > 0 ? all : undefined;
  };

  const filters: SearchFilters = {
    query: searchParams.get("q") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    make: toArray("make"),
    model: toArray("model"),
    bodyType: toArray("bodyType") as any,
    fuel: toArray("fuel") as any,
    transmission: toArray("transmission") as any,
    budgetMin: searchParams.get("budgetMin") ? Number(searchParams.get("budgetMin")) : undefined,
    budgetMax: searchParams.get("budgetMax") ? Number(searchParams.get("budgetMax")) : undefined,
    kmMax: searchParams.get("kmMax") ? Number(searchParams.get("kmMax")) : undefined,
    sort: (searchParams.get("sort") as any) ?? "relevance",
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 12,
  };

  const results = await searchListings(filters);
  return NextResponse.json(results);
}
