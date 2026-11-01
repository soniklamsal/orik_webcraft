import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    EMAIL_USER: process.env.EMAIL_USER ? "✅ Set" : "❌ Missing",
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? "✅ Set" : "❌ Missing",
    EMAIL_HOST: process.env.EMAIL_HOST || "❌ Not set",
    EMAIL_PORT: process.env.EMAIL_PORT || "❌ Not set",
    NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL ? "✅ Set" : "❌ Missing",
    nodeEnv: process.env.NODE_ENV,
  });
}