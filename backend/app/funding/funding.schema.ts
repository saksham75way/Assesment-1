import { Schema, model, Document } from "mongoose";

export interface IFunding extends Document {
  title: string;
  description: string;
  amountGoal: number;
  amountRaised: number;
  duration: number; // in days
  status: "ACTIVE" | "CLOSED";
  createdAt: Date;
  updatedAt: Date;
}

const FundingSchema = new Schema<IFunding>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    amountGoal: { type: Number, required: true },
    amountRaised: { type: Number, default: 0 },
    duration: { type: Number, required: true },
    status: { type: String, enum: ["ACTIVE", "CLOSED"], default: "ACTIVE" },
  },
  { timestamps: true }
);

export default model<IFunding>("Funding", FundingSchema);
