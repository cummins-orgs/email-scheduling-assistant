import { NextApiRequest, NextApiResponse } from 'next';
import { replyToEmail } from '../../utils/reply';
import { Gpt3Response } from '../../types/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, gpt3Response }: { email: string, gpt3Response: Gpt3Response } = req.body;

    try {
      await replyToEmail(email, gpt3Response.message);
      res.status(200).json({ status: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}