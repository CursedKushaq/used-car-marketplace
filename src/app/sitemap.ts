import type { MetadataRoute } from "next";
import { getAllListings, getAllDealers } from "@/server/modules/listings/service";
import { MAJOR_INDIAN_CITIES } from "@/server/modules/catalog/data";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://autobazaar.in";
  const now = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, priority: 1.0 },
    { url: `${baseUrl}/used-cars`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/sell`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/dealers`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/dealer`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/compare`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/how-we-verify`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/how-price-ratings-work`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/safety`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/guides`, lastModified: now, priority: 0.7 },
    { url: `${baseUrl}/legal/privacy`, lastModified: now, priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified: now, priority: 0.3 },
    { url: `${baseUrl}/legal/grievance`, lastModified: now, priority: 0.3 },
  ];

  // City pages
  const cityRoutes: MetadataRoute.Sitemap = MAJOR_INDIAN_CITIES.map((city) => ({
    url: `${baseUrl}/used-cars/${encodeURIComponent(city.toLowerCase().replace(/\s+/g, "-"))}`,
    lastModified: now,
    priority: 0.8,
  }));

  // Dealer Showroom Pages
  const dealers = getAllDealers();
  const dealerRoutes: MetadataRoute.Sitemap = dealers.map((d) => ({
    url: `${baseUrl}/dealers/${d.profile.slug || d.profile.id}`,
    lastModified: now,
    priority: 0.8,
  }));

  // Guide pages
  const guideRoutes: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: now,
    priority: 0.7,
  }));

  // Car detail pages
  const allCars = getAllListings();
  const carRoutes: MetadataRoute.Sitemap = allCars.map((car) => ({
    url: `${baseUrl}/car/${car.slug}-${car.id}`,
    lastModified: new Date(car.updatedAt),
    priority: 0.8,
  }));

  return [...staticRoutes, ...cityRoutes, ...dealerRoutes, ...guideRoutes, ...carRoutes];
}
