import type { NextApiRequest, NextApiResponse } from 'next';
import AppError from '../../../utils/appError';
import { handlerWrapper } from '../../../utils/apiHandler';
import { isValidEmail } from '../../../utils/helpers';
import Comment from '../../../models/Comment';

// ----------------
// POST
const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;
  let { email, name, text } = req.body;
  email = email.trim();
  name = name.trim();
  text = text.trim();

  if (!isValidEmail(email) || !name || !text)
    throw new AppError('Invalid email, name and/or comment', 422);

  const newComment = {
    eventId,
    email,
    name,
    text,
    // createdAt: new Date(),
  };

  const newDoc = new Comment(newComment);
  const doc = await newDoc.save();

  res.status(201).json({
    status: 'success',
    message: 'comment created',
    data: { doc },
  });
};

// ----------------
// GET
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;

  const comments = await Comment.find({ eventId: eventId.toString() }).sort({ createdAt: 'desc' });



  res.status(200).json({ status: 'success', data: { comments } });
};

// -----------------
// ROOT Handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { eventId } = req.query;
  if (!eventId) throw new AppError(`Must provide event id in query`, 422);

  if (req.method === 'POST') return await handlePOST(req, res);

  if (req.method === 'GET') return await handleGET(req, res);

  throw new AppError('Request is not allowed', 400);
};

export default handlerWrapper(handler);
