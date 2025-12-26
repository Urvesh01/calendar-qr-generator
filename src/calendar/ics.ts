import { CalendarEvent } from "../types";

export function generateICS(event: CalendarEvent): string {
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${event.title}`,
    `DTSTART:${fmt(event.start)}`,
    `DTEND:${fmt(event.end)}`,
    event.location ? `LOCATION:${event.location}` : "",
    event.description ? `DESCRIPTION:${event.description}` : "",
    "END:VEVENT",
    "END:VCALENDAR"
  ].filter(Boolean).join("\n");
}
