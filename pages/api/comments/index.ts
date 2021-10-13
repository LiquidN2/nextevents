import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { email, name, comment } = req.body;

      res.status(201).json({ message: 'success' });
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
    }
  }
};

export default handler;
