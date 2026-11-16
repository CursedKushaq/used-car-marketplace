import type { PriceRatingResult } from "../pricing/priceRating";
import type { VerificationLadderSummary } from "../verification/verificationLadder";

export type BodyType = "hatchback" | "sedan" | "suv" | "mpv";
export type FuelType = "petrol" | "diesel" | "cng" | "electric" | "hybrid";
export type TransmissionType = "manual" | "automatic";
export type SellerType = "individual" | "dealer" | "verified_dealer";

export interface VehiclePhoto {
  url: string;
  angle:
    | "front_three_quarter"
    | "rear_three_quarter"
    | "side"
    | "interior"
    | "dashboard"
    | "odometer"
    | "engine"
    | "imperfections";
  caption: string;
}

export interface InspectionSystemReport {
  name: string;
  status: "pass" | "attention" | "fail";
  details: string;
}

export interface InspectionReport {
  inspectedAt: string;
  inspectorName: string;
  score: number; // e.g. 9.1 / 10
  systems: InspectionSystemReport[];
}

export interface PaperworkDetails {
  rcStatus: string;
  insuranceType: string;
  insuranceValidity: string;
  pucValidity: string;
  hypothecationStatus: string;
  rtoCode: string;
}

export interface SellerProfile {
  id: string;
  type: SellerType;
  name: string;
  phoneMasked: string;
  phoneReal?: string; // used after OTP reveal
  city: string;
  locality: string;
  rating?: number;
  reviewCount?: number;
  medianResponseHours: number;
  accuracyScorePercent: number; // e.g. 98%
  verifiedSinceYear: number;
}

export interface CarListing {
  id: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  registrationYear: number;
  registrationState: string;
  registrationNumberMasked: string;
  registrationNumberReal?: string;
  bodyType: BodyType;
  fuel: FuelType;
  transmission: TransmissionType;
  engineCc: number;
  powerPs: number;
  mileageKmpl?: number;
  seats: number;
  color: string;
  km: number;
  owners: number;
  priceInr: number;
  negotiable: boolean;
  city: string;
  locality: string;
  features: string[];
  photos: VehiclePhoto[];
  description: string;
  accidentHistory: "none" | "minor" | "major";
  floodDamaged: boolean;
  serviceHistory: "full" | "partial" | "none";
  priceRating: PriceRatingResult;
  verificationLadder: VerificationLadderSummary;
  paperwork: PaperworkDetails;
  inspection?: InspectionReport;
  seller: SellerProfile;
  listedAt: string;
  updatedAt: string;
  viewsCount: number;
  savesCount: number;
  enquiriesCount: number;
}

export interface SearchFilters {
  query?: string;
  city?: string;
  make?: string[];
  model?: string[];
  bodyType?: BodyType[];
  fuel?: FuelType[];
  transmission?: TransmissionType[];
  budgetMin?: number;
  budgetMax?: number;
  yearMin?: number;
  yearMax?: number;
  kmMax?: number;
  owners?: number[];
  sellerType?: SellerType[];
  verificationLevel?: ("declared" | "document_seen" | "partner_checked")[];
  priceRating?: ("below_market" | "in_line" | "above_market")[];
  features?: string[];
  sort?:
    | "relevance"
    | "price_asc"
    | "price_desc"
    | "km_asc"
    | "year_desc"
    | "rating_best";
  page?: number;
  limit?: number;
}

export interface SearchFacetOption {
  value: string;
  label: string;
  count: number;
}

export interface SearchResults {
  listings: CarListing[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets: {
    makes: SearchFacetOption[];
    bodyTypes: SearchFacetOption[];
    fuelTypes: SearchFacetOption[];
    transmissions: SearchFacetOption[];
    cities: SearchFacetOption[];
    sellerTypes: SearchFacetOption[];
    verificationLevels: SearchFacetOption[];
    priceRatings: SearchFacetOption[];
  };
}
