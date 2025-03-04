import { Schema, model, Document, Types } from "mongoose";
import { IPayment } from "../payment/payment.dto";

const PaymentSchema = new Schema<IPayment>(
  {
    userId: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    fundingId: [
      { type: Schema.Types.ObjectId, ref: "Funding", required: false },
    ],
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      required: true,
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default model<IPayment>("Payment", PaymentSchema);
