import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import twilio from "twilio";

export async function POST(request: Request) {
  try {
    // Authenticate the user making the request
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, phones } = await request.json();

    if (!message || !phones || !Array.isArray(phones)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
      console.warn("Twilio credentials missing. Logging message instead of sending.");
      console.log(`To: ${phones.join(", ")}\nMessage: ${message}`);
      return NextResponse.json({ success: true, warning: "Mock mode" });
    }

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    // Send messages in parallel
    const sendPromises = phones.map((phone) => {
      return client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });
    });

    await Promise.allSettled(sendPromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SMS Blast Error:", error);
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }
}
