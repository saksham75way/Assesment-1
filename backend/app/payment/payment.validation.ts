import { body, checkExact } from "express-validator";

export const createPayment = checkExact([
  body("userId").notEmpty().withMessage("User ID is required"),
  body("amount").isNumeric().withMessage("Amount must be a number"),
  body("currency").notEmpty().withMessage("Currency is required"),
  body("fundingId")
    .optional()
    .isString()
    .withMessage("Funding ID must be a string"),
]);
