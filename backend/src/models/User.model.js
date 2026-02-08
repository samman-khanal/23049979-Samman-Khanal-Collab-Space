//? Importing necessary modules and models.
import mongoose from "mongoose";
import { ROLES } from "../constants/roles.constant.js";

//* Defining the User schema and model.
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
    isEmailVerified: { type: Boolean, default: false },
    avatarUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
