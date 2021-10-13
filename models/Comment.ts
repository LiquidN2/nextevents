import mongoose from 'mongoose';
import type { Document } from 'mongoose';

interface Comment extends Document {
  eventId: string;
  email: string;
  name: string;
  text: string;
  createdAt: Date;
}

const schema = new mongoose.Schema<Comment>({
  eventId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date },
});

schema.pre('save', function(next) {
  this.createdAt = new Date(); // 'this' refers to document
  next();
})

export default mongoose.models.Comment || mongoose.model<Comment>('Comment', schema);