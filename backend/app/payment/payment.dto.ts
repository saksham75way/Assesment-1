export interface IPayment extends Document {
  userId: string;
  fundingId?: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
