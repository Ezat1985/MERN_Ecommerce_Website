import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
    unique: true,
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
