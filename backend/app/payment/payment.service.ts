import PaymentModel from "./payment.schema";
import { IPayment } from "./payment.dto";
import UserModel from "../user/user.schema";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";

/**
 * Creates a new payment and associates it with a user.
 * @param {Partial<IPayment>} data - The payment data to create.
 * @returns {Promise<IPayment>} - The created payment object.
 */
export const createPayment = async (
  data: Partial<IPayment>
): Promise<IPayment> => {
  const payment = await PaymentModel.create({
    ...data,
    userId: new Types.ObjectId(data.userId),
    status: "PENDING",
  });

  await UserModel.findByIdAndUpdate(data.userId, {
    $push: { paymentIds: payment._id },
  });

  return payment.toObject();
};

/**
 * Retrieves a payment by its ID.
 * @param {string} id - The ID of the payment to retrieve.
 * @returns {Promise<IPayment | null>} - The payment object with the specified ID or null if not found.
 */
export const getPaymentById = async (id: string): Promise<IPayment | null> => {
  return await PaymentModel.findById(id).lean();
};

/**
 * Updates the status of a payment.
 * @param {string} id - The ID of the payment to update.
 * @param {"SUCCESS" | "FAILED"} status - The new status of the payment.
 * @returns {Promise<IPayment | null>} - The updated payment object or null if not found.
 */
export const updatePaymentStatus = async (
  id: string,
  status: "SUCCESS" | "FAILED"
): Promise<IPayment | null> => {
  return await PaymentModel.findByIdAndUpdate(id, { status }, { new: true });
};

/**
 * Retrieves all payments.
 * @returns {Promise<IPayment[]>} - A list of all payment objects.
 */
export const getAllPayments = async (): Promise<IPayment[]> => {
  return await PaymentModel.find({}).lean();
};

/**
 * Retrieves payments made by a specific user.
 * @param {string} userId - The ID of the user whose payments to retrieve.
 * @returns {Promise<IPayment[]>} - A list of payment objects made by the user.
 */
export const getPaymentsByUser = async (
  userId: string
): Promise<IPayment[]> => {
  return await PaymentModel.find({ userId: new Types.ObjectId(userId) }).lean();
};

/**
 * Processes a donation by creating a new payment record for the donation.
 * @param {string} userId - The ID of the user making the donation.
 * @param {number} amount - The amount of the donation.
 * @returns {Promise<IPayment>} - The created payment record for the donation.
 * @throws {Error} - Throws an error if the donation amount is less than or equal to zero.
 */
export const processDonation = async (
  userId: string,
  amount: number
): Promise<IPayment> => {
  if (amount <= 0) {
    throw new Error("Donation amount must be greater than zero");
  }

  const payment = await PaymentModel.create({
    userId: new Types.ObjectId(userId),
    amount,
    currency: "INR",
    status: "PENDING",
  });

  await UserModel.findByIdAndUpdate(userId, {
    $push: { paymentIds: payment._id },
  });

  return payment;
};
