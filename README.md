# Eva's 5th Birthday RSVP Site

This is a Next.js web application for Eva's 5th Birthday party announcement and RSVP.

## Setup Instructions

### Environment Variables

Copy the `.env.local.example` to `.env.local` and fill in the required values.

```bash
cp .env.local.example .env.local
```

### 1. Google Sheets Setup (Service Account)

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g., "Eva Birthday RSVP").
3. Enable the **Google Sheets API**.
4. Go to **IAM & Admin > Service Accounts** and create a new Service Account.
5. Create and download a JSON key for this Service Account.
6. Open the downloaded JSON file. You will need the `client_email` and `private_key`.
7. Extract the `private_key` (it should look like `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`).
8. Create a new Google Sheet on your normal Google account.
9. **IMPORTANT**: Click "Share" on the Google Sheet, and share it with the `client_email` from your Service Account as an **Editor**.
10. Get the Google Sheet ID from the URL (the long string between `/d/` and `/edit`).
11. Add these to your `.env.local` file:
    ```
    GOOGLE_CLIENT_EMAIL="your-service-account-email@project-id.iam.gserviceaccount.com"
    GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
    GOOGLE_SHEET_ID="your_sheet_id_here"
    ```

### 2. NextAuth (Google Login)

1. In the [Google Cloud Console](https://console.cloud.google.com/), go to **APIs & Services > Credentials**.
2. Create an **OAuth client ID** (Application type: Web application).
3. Set the Authorized redirect URIs. For local development: `http://localhost:3000/api/auth/callback/google`. For production, use your deployed URL (e.g., `https://your-domain.com/api/auth/callback/google`).
4. Copy the Client ID and Client Secret and add them to `.env.local`:
    ```
    GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
    GOOGLE_CLIENT_SECRET="your-client-secret"
    ```
5. Generate a random string for the `NEXTAUTH_SECRET` (you can use `openssl rand -base64 32` or just type a long random string).
    ```
    NEXTAUTH_SECRET="your_random_secret_string"
    ```

### 3. Twilio SMS Setup

1. Create a Twilio account at [twilio.com](https://www.twilio.com/).
2. Get a Twilio Phone Number.
3. Find your **Account SID** and **Auth Token** on the Twilio Console dashboard.
4. Add these to your `.env.local` file:
    ```
    TWILIO_ACCOUNT_SID="your_account_sid"
    TWILIO_AUTH_TOKEN="your_auth_token"
    TWILIO_PHONE_NUMBER="+1234567890"
    ```

## Running Locally

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open `http://localhost:3000` in your browser.
