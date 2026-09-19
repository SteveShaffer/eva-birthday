import { google } from "googleapis";

// Ensure private key is formatted correctly (handles escaping in Vercel environment variables)
const privateKey = process.env.GOOGLE_PRIVATE_KEY
  ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
  : "";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: privateKey,
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

export const sheets = google.sheets({
  auth,
  version: "v4",
});

export const SHEET_ID = process.env.GOOGLE_SHEET_ID;

// Define the RSVP type
export type RSVP = {
  name: string;
  guests: string;
  comment: string;
  timestamp: string;
  attendingSaturday: boolean;
  attendingSunday: boolean;
  attendingMonday: boolean;
};

// Helper to append a new RSVP
export async function appendRSVP(rsvp: RSVP) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:G", // Columns: Timestamp, Name, Guests, Comment, Saturday, Sunday, Monday
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          rsvp.timestamp, 
          rsvp.name, 
          rsvp.guests, 
          rsvp.comment, 
          rsvp.attendingSaturday ? "Yes" : "No",
          rsvp.attendingSunday ? "Yes" : "No",
          rsvp.attendingMonday ? "Yes" : "No"
        ]],
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error appending RSVP to Google Sheets", error);
    throw error;
  }
}

// Helper to get all RSVPs
export async function getRSVPs(): Promise<RSVP[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A:G",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // Skip the header row (assuming row 1 is header)
    const dataRows = rows.slice(1);
    
    return dataRows.map((row) => ({
      timestamp: row[0] || "",
      name: row[1] || "",
      guests: row[2] || "1",
      comment: row[3] || "",
      attendingSaturday: row[4] === "Yes",
      attendingSunday: row[5] === "Yes",
      attendingMonday: row[6] === "Yes",
    })).reverse(); // Reverse so newest are first
  } catch (error) {
    console.error("Error fetching RSVPs from Google Sheets", error);
    // If the sheet doesn't exist or is empty, return empty array instead of crashing
    return [];
  }
}
