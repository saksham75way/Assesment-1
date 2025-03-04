import mongoose from "mongoose";

const BankSchema = new mongoose.Schema(
  {
    accountNumber: { type: String, required: true, unique: true },
    bankName: { type: String, required: true },
    ifscCode: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export const Bank = mongoose.model("Bank", BankSchema);
