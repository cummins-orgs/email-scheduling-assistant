import { NextApiRequest, NextApiResponse } from 'next';
import { sendToGpt3 } from '../../utils/gpt3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { emailBody, calendarSummary } = req.body;

    const prompt = `You are an email scheduling assistant. ${calendarSummary} Write a short email. In it, you suggest some times between 11am and 6pm on weekdays that could work given this calendar information, i.e. times that are not already booked.`;

    try {
      const gpt3Response = await sendToGpt3(prompt);
      res.status(200).json({ message: gpt3Response });
    } catch (error) {
      res.status(500).json({ error: 'Error processing request' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}