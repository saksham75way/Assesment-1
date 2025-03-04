import { body, checkExact } from "express-validator";

export const createFunding = checkExact([
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("amountGoal").isNumeric().withMessage("Goal amount must be a number"),
  body("duration").isNumeric().withMessage("Duration must be a number"),
]);
