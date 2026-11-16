import { describe, it, expect } from "vitest";
import {
  searchListings,
  getListingById,
  getListingsByIds,
  getSimilarListings,
} from "./service";

describe("Listings Service", () => {
  it("returns search results with total count and facets", async () => {
    const results = await searchListings({});
    expect(results.total).toBeGreaterThan(0);
    expect(results.listings.length).toBeGreaterThan(0);
    expect(results.facets.makes.length).toBeGreaterThan(0);
    expect(results.facets.cities.length).toBeGreaterThan(0);
  });

  it("filters accurately by city", async () => {
    const results = await searchListings({ city: "mumbai" });
    expect(results.listings.length).toBeGreaterThan(0);
    for (const car of results.listings) {
      expect(car.city.toLowerCase()).toContain("mumbai");
    }
  });

  it("filters accurately by budget range", async () => {
    const results = await searchListings({
      budgetMin: 600000,
      budgetMax: 1000000,
    });
    for (const car of results.listings) {
      expect(car.priceInr).toBeGreaterThanOrEqual(600000);
      expect(car.priceInr).toBeLessThanOrEqual(1000000);
    }
  });

  it("finds car by ID", async () => {
    const car = await getListingById("dl-swift-2021");
    expect(car).not.toBeNull();
    expect(car?.make).toBe("Maruti Suzuki");
    expect(car?.model).toBe("Swift");
  });

  it("fetches multiple cars by IDs for comparison", async () => {
    const cars = await getListingsByIds(["dl-swift-2021", "mum-creta-2022"]);
    expect(cars.length).toBe(2);
    expect(cars.map((c) => c.id)).toContain("dl-swift-2021");
    expect(cars.map((c) => c.id)).toContain("mum-creta-2022");
  });

  it("returns similar cars sharing bodyType or make", async () => {
    const similar = await getSimilarListings("mum-creta-2022", 2);
    expect(similar.length).toBe(2);
    expect(similar.map((c) => c.id)).not.toContain("mum-creta-2022");
  });
});
