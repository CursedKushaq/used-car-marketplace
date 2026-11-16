"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { SearchResults } from "@/server/modules/catalog/types";
import { ListingCard } from "./ListingCard";
import { FilterPanel } from "../filters/FilterPanel";
import { FilterChips } from "../filters/FilterChips";
import { Button } from "../ui/Button";
import {
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  SearchX,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

interface SearchResultsViewProps {
  initialResults: SearchResults;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  initialResults,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const currentSort = searchParams.get("sort") ?? "relevance";
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    params.delete("page");
    router.push(`/used-cars?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/used-cars?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* ── Page Header & Result Meta ─────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-muted/15 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
            Used Cars for Sale in India
          </h1>
          <p className="text-xs text-muted mt-1">
            Showing <strong className="text-ink font-semibold">{initialResults.total}</strong> verified vehicles with objective price ratings
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 rounded-xl border border-muted/20 bg-surface px-3.5 py-2 text-xs font-semibold text-ink shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span>Filters</span>
          </button>

          {/* Sort Control */}
          <div className="flex items-center gap-1.5 rounded-xl border border-muted/20 bg-surface px-3 py-1.5 text-xs text-muted shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent font-semibold text-ink focus:outline-none cursor-pointer"
            >
              <option value="relevance">Best Match</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="km_asc">Lowest Kilometres</option>
              <option value="year_desc">Newest Year</option>
              <option value="rating_best">Best Price Rating</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center rounded-xl border border-muted/20 bg-surface p-1 shadow-xs">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "text-muted hover:text-ink"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "text-muted hover:text-ink"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Applied Filter Chips Bar ─────────────────── */}
      <FilterChips />

      {/* ── Main Two-Column Layout ────────────────────── */}
      <div className="flex items-start gap-8">
        {/* Desktop Filter Panel */}
        <FilterPanel
          facets={initialResults.facets}
          isOpenMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />

        {/* Listings Results Stream */}
        <div className="flex-1 min-w-0 space-y-8">
          {initialResults.listings.length === 0 ? (
            /* Empty State */
            <div className="rounded-2xl border border-muted/20 bg-surface p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-canvas flex items-center justify-center mx-auto text-muted">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-ink">No matching cars found</h3>
              <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any vehicles matching all your selected filters. Try broadening your budget range, clearing specific fuel/make filters, or searching nearby cities.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/used-cars")}
                className="mt-2"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            /* Results Grid */
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {initialResults.listings.map((car) => (
                <ListingCard key={car.id} listing={car} />
              ))}
            </div>
          )}

          {/* ── Pagination ──────────────────────────────── */}
          {initialResults.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-muted/15 pt-6 text-xs">
              <span className="text-muted">
                Page <strong className="text-ink">{currentPage}</strong> of{" "}
                <strong className="text-ink">{initialResults.totalPages}</strong>
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage >= initialResults.totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
