import mongoose from 'mongoose';
import type { Document } from 'mongoose';
import AppError from '../utils/appError';

interface Newsletter extends Document {
  email: string;
}

const schema = new mongoose.Schema<Newsletter>({
  email: { type: String, required: true, unique: true },
});

schema.post('save', function (error: any, doc: any, next: Function) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const duplicatedFields: string[] = [];

    for (let key in error.keyValue) {
      duplicatedFields.push(key);
    }

    const errorMessage =
      duplicatedFields.length > 1
        ? `${duplicatedFields.join(', ')} have been used.`
        : `${duplicatedFields[0]} has been used.`;

    next(new AppError(errorMessage, 422));
  } else {
    next(error);
  }
});

export default mongoose.models.Newsletter ||
  mongoose.model<Newsletter>('Newsletter', schema);
