import mongoose from 'mongoose';

const predefinedCategories = [
  'TV',
  'Smartphone',
  'Console',
  'Laptop',
  'Tablet',
  'Wearables',
  'Audio',
  'Camera',
  'Gaming',
  'Accessories',
  'NEW',
];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  brand: {
    type: String,
    default: '',
  },
  new_price: {
    type: String,
    default: 0,
  },
  old_price: {
    type: String,
    default: 0,
  },
  category: {
    type: String,
    enum: predefinedCategories,
    default: 'NEW',
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', productSchema);
