import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: 'NEW' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Category', categorySchema);
