import React from "react";
import type { Metadata } from "next";
import { SellWizard } from "@/components/sell/SellWizard";

export const metadata: Metadata = {
  title: "Create a Used Car Listing",
  description:
    "Publish your used vehicle on AutoBazaar with guided photos, transparent condition reporting, and live valuation estimates.",
};

export default function SellNewListingPage() {
  return <SellWizard />;
}
