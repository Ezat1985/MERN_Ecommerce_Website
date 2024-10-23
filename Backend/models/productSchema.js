import mongoose from "mongoose";

const productSchema = mongoose.Schema({
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
    default: "",
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
    required: true,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
  reting: {
    type: Number,
    default: 0,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);