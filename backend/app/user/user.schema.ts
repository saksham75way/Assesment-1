import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { type IUser } from "./user.dto";

const Schema = mongoose.Schema;

const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    role: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    password: { type: String, required: true, select: false },
    paymentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
    fundingIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Funding" }],
    bankId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bank" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});

export default mongoose.model<IUser>("User", UserSchema);
