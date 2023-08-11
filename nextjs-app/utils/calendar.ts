import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { CalendarEvent } from '../types/index';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL, GOOGLE_REFRESH_TOKEN } = process.env;

const oAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
);

oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: now.toISOString(),
    timeMax: nextWeek.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = response.data.items.map((event) => ({
    start: event.start.dateTime || event.start.date,
    end: event.end.dateTime || event.end.date,
    summary: event.summary,
  }));

  return events;
}