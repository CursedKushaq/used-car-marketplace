import { NextResponse } from "next/server";
import { z } from "zod";

const verifyOtpSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/),
  otp: z.string().min(4).max(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = verifyOtpSchema.parse(body);

    // In demo environment, accept '1234' or any valid 4-6 digit numeric OTP
    if (/^\d{4,6}$/.test(validated.otp)) {
      return NextResponse.json({
        verified: true,
        token: `mock_verified_token_${Date.now()}`,
        phone: `+91${validated.phone}`,
      });
    }

    return NextResponse.json(
      { error: "Invalid verification code", code: "INVALID_OTP" },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.errors?.[0]?.message ?? "Invalid verification request" },
      { status: 400 }
    );
  }
}
