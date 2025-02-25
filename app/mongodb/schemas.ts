import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store securely (hashed)
  name: { type: String, required: true },
  role: { type: String, default: "cashier" }, // "admin" or "cashier"
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
