import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
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
  // numReviews: {
  //   type: Number,
  //   default: 0,
  // },
  // isFeatured: {
  //   type: Boolean,
  //   default: false,
  // },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
