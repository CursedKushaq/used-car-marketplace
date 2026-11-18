import type {
  CarListing,
  SearchFilters,
  SearchResults,
  SearchFacetOption,
} from "../catalog/types";
import { getSeedListings } from "../catalog/data";

// Cached in-memory listings pool
let cachedListings: CarListing[] | null = null;

export function getAllListings(): CarListing[] {
  if (!cachedListings) {
    cachedListings = getSeedListings();
  }
  return cachedListings;
}

export async function searchListings(filters: SearchFilters): Promise<SearchResults> {
  const all = getAllListings();
  const page = Math.max(1, filters.page ?? 1);
  const limit = Math.max(1, filters.limit ?? 12);

  let filtered = all.filter((car) => {
    // Text search query
    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const searchableText = `${car.make} ${car.model} ${car.variant} ${car.city} ${car.locality} ${car.fuel} ${car.transmission} ${car.color} ${car.features.join(" ")}`.toLowerCase();
      const terms = q.split(/\s+/);
      const matchesAll = terms.every((term) => searchableText.includes(term));
      if (!matchesAll) return false;
    }

    // City
    if (filters.city && filters.city !== "all") {
      const targetCity = filters.city.toLowerCase().replace(/-/g, " ");
      const carCity = car.city.toLowerCase();
      if (!carCity.includes(targetCity) && !targetCity.includes(carCity)) {
        return false;
      }
    }

    // Make
    if (filters.make && filters.make.length > 0) {
      if (!filters.make.some((m) => m.toLowerCase() === car.make.toLowerCase())) {
        return false;
      }
    }

    // Model
    if (filters.model && filters.model.length > 0) {
      if (!filters.model.some((m) => m.toLowerCase() === car.model.toLowerCase())) {
        return false;
      }
    }

    // Body Type
    if (filters.bodyType && filters.bodyType.length > 0) {
      if (!filters.bodyType.includes(car.bodyType)) {
        return false;
      }
    }

    // Fuel Type
    if (filters.fuel && filters.fuel.length > 0) {
      if (!filters.fuel.includes(car.fuel)) {
        return false;
      }
    }

    // Transmission
    if (filters.transmission && filters.transmission.length > 0) {
      if (!filters.transmission.includes(car.transmission)) {
        return false;
      }
    }

    // Budget
    if (typeof filters.budgetMin === "number" && car.priceInr < filters.budgetMin) {
      return false;
    }
    if (typeof filters.budgetMax === "number" && car.priceInr > filters.budgetMax) {
      return false;
    }

    // Kilometres
    if (typeof filters.kmMax === "number" && car.km > filters.kmMax) {
      return false;
    }

    // Year
    if (typeof filters.yearMin === "number" && car.year < filters.yearMin) {
      return false;
    }
    if (typeof filters.yearMax === "number" && car.year > filters.yearMax) {
      return false;
    }

    // Owners
    if (filters.owners && filters.owners.length > 0) {
      if (!filters.owners.includes(car.owners)) {
        return false;
      }
    }

    // Seller Type
    if (filters.sellerType && filters.sellerType.length > 0) {
      if (!filters.sellerType.includes(car.seller.type)) {
        return false;
      }
    }

    // Verification Level
    if (filters.verificationLevel && filters.verificationLevel.length > 0) {
      if (!filters.verificationLevel.includes(car.verificationLadder.overallLevel)) {
        return false;
      }
    }

    // Price Rating
    if (filters.priceRating && filters.priceRating.length > 0) {
      if (!filters.priceRating.includes(car.priceRating.rating as any)) {
        return false;
      }
    }

    // Features
    if (filters.features && filters.features.length > 0) {
      const hasAll = filters.features.every((f) =>
        car.features.some((cf) => cf.toLowerCase().includes(f.toLowerCase()))
      );
      if (!hasAll) return false;
    }

    return true;
  });

  // Sorting
  const sort = filters.sort ?? "relevance";
  filtered.sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return a.priceInr - b.priceInr;
      case "price_desc":
        return b.priceInr - a.priceInr;
      case "km_asc":
        return a.km - b.km;
      case "year_desc":
        return b.year - a.year;
      case "rating_best": {
        const ratingWeight = { below_market: 3, in_line: 2, above_market: 1, insufficient_data: 0 };
        return ratingWeight[b.priceRating.rating] - ratingWeight[a.priceRating.rating];
      }
      case "relevance":
      default:
        return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
    }
  });

  // Calculate facets from all matching records
  const makesMap = new Map<string, number>();
  const bodyTypesMap = new Map<string, number>();
  const fuelTypesMap = new Map<string, number>();
  const transmissionsMap = new Map<string, number>();
  const citiesMap = new Map<string, number>();
  const sellerTypesMap = new Map<string, number>();
  const verificationLevelsMap = new Map<string, number>();
  const priceRatingsMap = new Map<string, number>();

  for (const car of all) {
    makesMap.set(car.make, (makesMap.get(car.make) || 0) + 1);
    bodyTypesMap.set(car.bodyType, (bodyTypesMap.get(car.bodyType) || 0) + 1);
    fuelTypesMap.set(car.fuel, (fuelTypesMap.get(car.fuel) || 0) + 1);
    transmissionsMap.set(car.transmission, (transmissionsMap.get(car.transmission) || 0) + 1);
    citiesMap.set(car.city, (citiesMap.get(car.city) || 0) + 1);
    sellerTypesMap.set(car.seller.type, (sellerTypesMap.get(car.seller.type) || 0) + 1);
    verificationLevelsMap.set(
      car.verificationLadder.overallLevel,
      (verificationLevelsMap.get(car.verificationLadder.overallLevel) || 0) + 1
    );
    priceRatingsMap.set(
      car.priceRating.rating,
      (priceRatingsMap.get(car.priceRating.rating) || 0) + 1
    );
  }

  const mapToOptions = (map: Map<string, number>): SearchFacetOption[] =>
    Array.from(map.entries()).map(([value, count]) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, " "),
      count,
    }));

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const pagedListings = filtered.slice(offset, offset + limit);

  return {
    listings: pagedListings,
    total,
    page,
    limit,
    totalPages,
    facets: {
      makes: mapToOptions(makesMap),
      bodyTypes: mapToOptions(bodyTypesMap),
      fuelTypes: mapToOptions(fuelTypesMap),
      transmissions: mapToOptions(transmissionsMap),
      cities: mapToOptions(citiesMap),
      sellerTypes: mapToOptions(sellerTypesMap),
      verificationLevels: mapToOptions(verificationLevelsMap),
      priceRatings: mapToOptions(priceRatingsMap),
    },
  };
}

export async function getListingById(id: string): Promise<CarListing | null> {
  const all = getAllListings();
  return all.find((car) => car.id === id) || null;
}

export async function getListingBySlug(slug: string): Promise<CarListing | null> {
  const all = getAllListings();
  // Support slug match or id extract e.g. "2021-maruti-suzuki-swift-dl-swift-2021"
  const found = all.find((car) => car.slug === slug || slug.endsWith(car.id));
  return found || null;
}

export async function getSimilarListings(
  id: string,
  limit: number = 3
): Promise<CarListing[]> {
  const all = getAllListings();
  const current = all.find((c) => c.id === id);
  if (!current) return all.slice(0, limit);

  const candidates = all.filter((c) => c.id !== id);

  // Score similarity: same bodyType (+3), same make (+2), price within 25% (+3)
  const scored = candidates.map((car) => {
    let score = 0;
    if (car.bodyType === current.bodyType) score += 3;
    if (car.make === current.make) score += 2;
    const priceDiffRatio = Math.abs(car.priceInr - current.priceInr) / current.priceInr;
    if (priceDiffRatio < 0.25) score += 3;
    return { car, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.car);
}

export async function getListingsByIds(ids: string[]): Promise<CarListing[]> {
  const all = getAllListings();
  const idSet = new Set(ids);
  return all.filter((car) => idSet.has(car.id));
}

export async function getPopularCars(limit: number = 6): Promise<CarListing[]> {
  const all = getAllListings();
  // Sort by saves + views
  const sorted = [...all].sort(
    (a, b) => b.savesCount * 3 + b.viewsCount - (a.savesCount * 3 + a.viewsCount)
  );
  return sorted.slice(0, limit);
}

export interface DealerWithInventory {
  profile: CarListing["seller"];
  inventory: CarListing[];
  stockCount: number;
}

export function getAllDealers(): DealerWithInventory[] {
  const all = getAllListings();
  const dealerMap = new Map<string, DealerWithInventory>();

  for (const car of all) {
    if (car.seller.type === "verified_dealer") {
      const existing = dealerMap.get(car.seller.id);
      if (existing) {
        existing.inventory.push(car);
        existing.stockCount = existing.inventory.length;
      } else {
        dealerMap.set(car.seller.id, {
          profile: car.seller,
          inventory: [car],
          stockCount: 1,
        });
      }
    }
  }

  return Array.from(dealerMap.values());
}

export function getDealerBySlug(slugOrId: string): DealerWithInventory | null {
  const dealers = getAllDealers();
  return (
    dealers.find(
      (d) =>
        d.profile.slug === slugOrId ||
        d.profile.id === slugOrId ||
        d.profile.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slugOrId
    ) || null
  );
}

export function getListingsByDealer(dealerId: string): CarListing[] {
  const all = getAllListings();
  return all.filter((car) => car.seller.id === dealerId);
}
