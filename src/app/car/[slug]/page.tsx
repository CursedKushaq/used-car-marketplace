import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getListingBySlug,
  getListingById,
  getSimilarListings,
} from "@/server/modules/listings/service";
import { VehicleDetailContent } from "@/components/listing/VehicleDetailContent";

interface CarDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = (await getListingBySlug(slug)) || (await getListingById(slug));

  if (!car) {
    return {
      title: "Car Not Found",
    };
  }

  return {
    title: `${car.title} for Sale in ${car.city}`,
    description: `Buy verified ${car.year} ${car.make} ${car.model} ${car.variant} in ${car.city}. ${car.km} km, ${car.priceRating.label}, with 160-point inspection and verified RC status.`,
    openGraph: {
      title: `${car.title} — AutoBazaar`,
      description: car.description,
      images: car.photos[0] ? [{ url: car.photos[0].url }] : [],
    },
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = (await getListingBySlug(slug)) || (await getListingById(slug));

  if (!car) {
    notFound();
  }

  const similar = await getSimilarListings(car.id, 3);

  return <VehicleDetailContent listing={car} similarListings={similar} />;
}
