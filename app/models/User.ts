import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store securely (hashed)
  name: { type: String, required: true },
  role: { type: String, required: true, default: "cashier" }, // "admin" or "cashier"
  isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true });

// export default mongoose.models.User || mongoose.model("User", userSchema);

// Automatically hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  console.log("Password after hashing:", this.password); // Debug log
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);