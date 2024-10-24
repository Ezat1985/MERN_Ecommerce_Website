import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: 'NEW',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Category', categorySchema);
