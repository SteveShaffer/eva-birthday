<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-context -->
# Project Context: Megan's 40th Birthday Surprise

This project was repurposed from a previous party (Eva's 5th Birthday) to become a surprise weekend at Disneyland for Megan's 40th (Sept 26-28, 2026).

## Key Rules & Constraints
- **The Secret**: Megan knows about the Disneyland trip itself, but she DOES NOT know that friends are coming, and she DOES NOT know about the main Sunday Dinner event. Any UI/copy updates MUST maintain this secret.
- **Deployment URL**: The app will be deployed to `https://party.shaffer.tech`.
- **Database Architecture**: The app strictly uses Google Sheets as a database via the `googleapis` library. No Firebase or SQL database is used. The sheet has 7 columns: Timestamp, Name, Guests, Comment, Saturday, Sunday, Monday.
- **RSVP Logic**: RSVPs do not use phone numbers. Instead, guests select exactly which days they are attending via three separate boolean fields (`attendingSaturday`, `attendingSunday`, `attendingMonday`).
- **Twilio/SMS**: Phone numbers and Twilio SMS functionality were completely removed from this project. Do not reintroduce them.
<!-- END:project-context -->
