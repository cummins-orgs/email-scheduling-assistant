import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { getCalendarEvents } from '../../utils/calendar';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const calendar = google.calendar({ version: 'v3', auth: process.env.GOOGLE_API_KEY });
      const now = new Date();
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const events = await getCalendarEvents(calendar, process.env.CALENDAR_ID, now, nextWeek);

      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving calendar events' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}