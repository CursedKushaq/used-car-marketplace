import { NextResponse } from "next/server";
import { getListingById } from "@/server/modules/listings/service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    return NextResponse.json(
      { error: "Listing not found", code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  return NextResponse.json(listing);
}
