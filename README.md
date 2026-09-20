# Megan's 40th Birthday Surprise Website

This is a Next.js web application for Megan's 40th Birthday weekend at Disneyland. It features a Disneyland-themed UI, dynamic RSVPs stored in Google Sheets, and calendar integrations.

## Architecture Highlights
- **Framework**: Next.js 16 (App Router)
- **Database**: Google Sheets via `googleapis`
- **Deployment URL**: `https://party.shaffer.tech`
- **Styling**: Standard CSS Modules (`globals.css`, `page.module.css`)
- **Key Theme**: Magical Disneyland aesthetic (Disney Red, Blue, Yellow color scheme), gradient overlay on castle background, custom SVG icon.

## Setup Instructions

### Environment Variables

Copy the `.env.local.example` to `.env.local` and fill in the required values.

```bash
cp .env.local.example .env.local
```

### 1. Google Sheets Setup (Service Account)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enable the **Google Sheets API**.
4. Go to **IAM & Admin > Service Accounts** and create a new Service Account.
5. Create and download a JSON key for this Service Account.
6. Open the downloaded JSON file. You will need the `client_email` and `private_key`.
7. Extract the `private_key` (it should look like `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`).
8. Create a new Google Sheet on your normal Google account.
9. **IMPORTANT**: Click "Share" on the Google Sheet, and share it with the `client_email` from your Service Account as an **Editor**.
10. The sheet requires 7 columns: `Timestamp, Name, Guests, Comment, Saturday, Sunday, Monday`.
11. Get the Google Sheet ID from the URL (the long string between `/d/` and `/edit`).
12. Add these to your `.env.local` file:
    ```
    GOOGLE_CLIENT_EMAIL="your-service-account-email@project-id.iam.gserviceaccount.com"
    GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
    GOOGLE_SHEET_ID="your_sheet_id_here"
    ```

### 2. NextAuth (Admin Dashboard Login)

1. Create an **OAuth client ID** in Google Cloud Console.
2. Set the Authorized redirect URIs (`http://localhost:3000/api/auth/callback/google` and `https://party.shaffer.tech/api/auth/callback/google`).
3. Add to `.env.local`:
    ```
    GOOGLE_CLIENT_ID="your-client-id"
    GOOGLE_CLIENT_SECRET="your-client-secret"
    NEXTAUTH_SECRET="your_random_secret_string"
    ```

## Running Locally

1. Install dependencies: `npm install`
2. Run the **Guest RSVP site** (`party.shaffer.tech` mode):
   ```bash
   npm run dev
   ```
3. Or run **Megan's Itinerary site** (`40.shaffer.tech` mode):
   ```bash
   npm run dev:megan
   ```
4. Open `http://localhost:3000` in your browser.
