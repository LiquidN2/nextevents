import type { NextApiRequest, NextApiResponse } from 'next';
import AppError from '../../utils/appError';
import { handlerWrapper } from '../../utils/apiHandler';
import { isValidEmail } from '../../utils/helpers';

import Newsletter from '../../models/Newsletter';

// ----------------
// POST
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  let { email } = req.body;
  email = email.trim();

  if (!isValidEmail(email)) throw new AppError('invalid email address', 422);

  const newDoc = new Newsletter({ email });
  const doc = await newDoc.save();

  res.status(201).json({
    status: 'success',
    message: 'signup successful',
    data: { doc },
  });
};

// ----------------
// GET
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ status: 'success' });
};

// ----------------
// ROOT Handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') return await handlePOST(req, res);

  if (req.method === 'GET') return await handleGET(req, res);

  throw new AppError('Request is not allowed', 400);
};

export default handlerWrapper(handler);
