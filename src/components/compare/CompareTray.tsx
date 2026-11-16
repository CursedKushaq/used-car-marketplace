"use client";

import React from "react";
import Link from "next/link";
import { useCompare, MAX_COMPARE_CARS } from "./CompareContext";
import { getAllListings } from "@/server/modules/listings/service";
import { X, ArrowRight, GitCompare } from "lucide-react";
import { Button } from "../ui/Button";

export const CompareTray: React.FC = () => {
  const { compareIds, removeFromCompare, clearCompare } = useCompare();

  if (compareIds.length === 0) return null;

  const allCars = getAllListings();
  const selectedCars = compareIds
    .map((id) => allCars.find((c) => c.id === id))
    .filter(Boolean);

  const compareUrl = `/compare?ids=${compareIds.join(",")}`;

  return (
    <aside
      aria-label="Vehicle comparison tray"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl rounded-2xl border border-muted/20 bg-surface/95 backdrop-blur-md p-3.5 shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <GitCompare className="w-4 h-4" />
            <span>
              Compare ({compareIds.length}/{MAX_COMPARE_CARS})
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1 flex-1 sm:flex-initial">
            {selectedCars.map((car) => {
              if (!car) return null;
              return (
                <div
                  key={car.id}
                  className="group relative flex items-center gap-2 bg-canvas border border-muted/20 rounded-xl px-2.5 py-1.5 text-xs font-medium text-ink shrink-0"
                >
                  <img
                    src={car.photos[0]?.url}
                    alt={car.title}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="truncate max-w-[110px]">{car.title}</span>
                  <button
                    onClick={() => removeFromCompare(car.id)}
                    className="text-muted hover:text-danger rounded p-0.5"
                    aria-label={`Remove ${car.title} from comparison`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={clearCompare}
            className="text-xs text-muted hover:text-ink px-2 py-1 underline underline-offset-2"
          >
            Clear all
          </button>
          <Link href={compareUrl}>
            <Button size="sm" className="gap-1.5 text-xs px-4">
              Compare Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
};
