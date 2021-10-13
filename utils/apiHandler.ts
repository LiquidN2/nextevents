import type { NextApiRequest, NextApiResponse } from 'next';
// import AppError from './appError';
import dbConnect from '../db/dbConnect';

export const handlerWrapper = (fn: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Connect to DB
      await dbConnect();

      // Execute API handler
      await fn(req, res);
    } catch (err: any) {
      const statusCode = err.statusCode || 500;

      const body = {
        status: err.status || 'error',
        message: err.message || 'unknown error',
      };

      res.status(statusCode).json(body);
    }
  };
};
