import { z } from "zod";

export const bankValidationSchema = z.object({
  accountNumber: z.string().min(9, "Account number must be at least 9 digits"),
  bankName: z.string().min(3, "Bank name is required"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  balance: z.number().min(0, "Balance must be at least 0"),
});
