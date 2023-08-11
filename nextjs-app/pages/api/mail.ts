import { NextApiRequest, NextApiResponse } from 'next';
import { receiveEmail } from '../../utils/mail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const email = await receiveEmail(req.body);
      res.status(200).json({ success: true, data: email });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}