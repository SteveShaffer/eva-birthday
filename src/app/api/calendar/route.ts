export async function GET() {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Eva Birthday//EN
BEGIN:VEVENT
UID:evabirthday2026
DTSTAMP:20260429T000000Z
DTSTART:20260523T180000Z
DTEND:20260523T220000Z
SUMMARY:Eva's 5th Birthday Party!
DESCRIPTION:Join us for a WILD time! We will update on our exact location the morning of the event.\\n\\nWebsite: https://eva.shaffer.tech
LOCATION:Irvine Regional Park, 1 Irvine Park Road, Orange, California 92869
END:VEVENT
END:VCALENDAR`;

  return new Response(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="evas-5th-birthday.ics"',
    },
  });
}
