"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface CompareContextType {
  compareIds: string[];
  addToCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  toggleCompare: (id: string) => boolean;
  clearCompare: () => void;
  isComparing: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const STORAGE_KEY = "autobazaar_compare_ids";
export const MAX_COMPARE_CARS = 4;

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompareIds(parsed.slice(0, MAX_COMPARE_CARS));
        }
      }
    } catch {
      // Ignore localStorage parse errors
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [compareIds, isLoaded]);

  const addToCompare = (id: string): boolean => {
    if (compareIds.includes(id)) return true;
    if (compareIds.length >= MAX_COMPARE_CARS) {
      alert(`You can compare up to ${MAX_COMPARE_CARS} vehicles at a time.`);
      return false;
    }
    setCompareIds((prev) => [...prev, id]);
    return true;
  };

  const removeFromCompare = (id: string) => {
    setCompareIds((prev) => prev.filter((i) => i !== id));
  };

  const toggleCompare = (id: string): boolean => {
    if (compareIds.includes(id)) {
      removeFromCompare(id);
      return false;
    } else {
      return addToCompare(id);
    }
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

  const isComparing = (id: string) => compareIds.includes(id);

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        clearCompare,
        isComparing,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
