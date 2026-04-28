import { NextResponse } from "next/server";
import { appendRSVP, getRSVPs } from "@/lib/google-sheets";

export async function GET() {
  try {
    // If running without env vars (e.g. initial setup), return empty array
    if (!process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json({ rsvps: [] });
    }
    
    const rsvps = await getRSVPs();
    // For the public feed, we might want to sanitize the data
    // Let's hide phone numbers from the public API
    const sanitizedRsvps = rsvps.map(({ phone, ...rest }) => rest);
    
    return NextResponse.json({ rsvps: sanitizedRsvps });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch RSVPs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check if env vars are configured
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_PRIVATE_KEY) {
      // In a real scenario, we might want to log this but fake success so the UI doesn't break during dev
      console.warn("Google Sheets not configured. RSVP not saved.");
      return NextResponse.json({ success: true, warning: "Mock mode" });
    }

    const body = await request.json();
    const { name, phone, guests, comment } = body;

    if (!name || !phone || !guests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await appendRSVP({
      name,
      phone,
      guests: guests.toString(),
      comment: comment || "",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP Submission Error:", error);
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}
