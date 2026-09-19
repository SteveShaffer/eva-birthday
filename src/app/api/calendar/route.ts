export async function GET() {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Megan Birthday//EN
BEGIN:VEVENT
UID:meganbirthday2026
DTSTAMP:20260905T000000Z
DTSTART:20260928T010000Z
DTEND:20260928T030000Z
SUMMARY:Megan's 40th Birthday Dinner & Celebration
DESCRIPTION:No gifts required. Dinner is complimentary. Parking in the Downtown Disney Simba lot is $10 with validation. (Remember: Megan knows about the trip\\, but Sunday dinner is a surprise!)\\n\\nWebsite: https://party.shaffer.tech
LOCATION:Naples Ristorante e Bar, 1550 Disneyland Dr, Anaheim, CA 92802
END:VEVENT
END:VCALENDAR`;

  return new Response(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="megans-40th-dinner.ics"',
    },
  });
}
