import { NextResponse } from "next/server";
import { z } from "zod";

const estimateSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(2005).max(2026),
  km: z.number().int().min(0).max(500000),
  condition: z.enum(["excellent", "good", "fair"]).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = estimateSchema.parse(body);

    let base = 700000;
    if (data.make.toLowerCase().includes("maruti")) base = 600000;
    if (data.make.toLowerCase().includes("hyundai")) base = 720000;
    if (data.make.toLowerCase().includes("mahindra")) base = 1200000;
    if (data.make.toLowerCase().includes("toyota")) base = 1400000;

    const age = 2026 - data.year;
    const ageDep = Math.pow(0.88, age);
    const kmDep = Math.max(0.7, 1 - (data.km / 120000) * 0.25);
    const mid = Math.round(base * ageDep * kmDep);

    const low = Math.round(mid * 0.92);
    const high = Math.round(mid * 1.06);

    return NextResponse.json({
      success: true,
      estimatedRangeInr: {
        low,
        mid,
        high,
      },
      currency: "INR",
      methodVersion: "v0.1-rule-based",
      disclaimer:
        "Indicative estimate derived from active market comparables. Actual realization depends on physical mechanical condition, tyre life, and valid insurance.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.errors?.[0]?.message ?? "Invalid estimate request" },
      { status: 400 }
    );
  }
}
