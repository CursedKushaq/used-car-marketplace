import { NextResponse } from "next/server";
import { z } from "zod";

const sendOtpSchema = z.object({
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  purpose: z.enum(["enquiry", "seller_registration", "signin"]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = sendOtpSchema.parse(body);

    // In demo environment, OTP is simulated (e.g. 1234)
    return NextResponse.json({
      success: true,
      message: "OTP sent successfully via SMS",
      expiresInSeconds: 300,
      phoneMasked: `+91 ${validated.phone.slice(0, 2)}•••• ••${validated.phone.slice(-2)}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.errors?.[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }
}
