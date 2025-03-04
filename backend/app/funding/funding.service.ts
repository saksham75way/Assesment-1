import FundingModel, { IFunding } from "./funding.schema";
import { Types } from "mongoose";
import UserModel from "../user/user.schema";
import PaymentModel from "../payment/payment.schema";

/**
 * Creates a new funding plan.
 * @param {Partial<IFunding>} data - The data to create the funding plan.
 * @returns {Promise<IFunding>} - The created funding plan.
 */
export const createFunding = async (
  data: Partial<IFunding>
): Promise<IFunding> => {
  return await FundingModel.create(data);
};

/**
 * Retrieves all funding plans.
 * @returns {Promise<IFunding[]>} - A list of all funding plans.
 */
export const getAllFunding = async (): Promise<IFunding[]> => {
  return await FundingModel.find({}).lean();
};

/**
 * Retrieves a funding plan by its ID.
 * @param {string} id - The ID of the funding plan to retrieve.
 * @returns {Promise<IFunding | null>} - The funding plan with the specified ID, or null if not found.
 */
export const getFundingById = async (id: string): Promise<IFunding | null> => {
  return await FundingModel.findById(id).lean();
};

/**
 * Updates the status of a funding plan.
 * @param {string} id - The ID of the funding plan to update.
 * @param {"ACTIVE" | "CLOSED"} status - The new status of the funding plan.
 * @returns {Promise<IFunding | null>} - The updated funding plan or null if not found.
 */
export const updateFundingStatus = async (
  id: string,
  status: "ACTIVE" | "CLOSED"
): Promise<IFunding | null> => {
  return await FundingModel.findByIdAndUpdate(id, { status }, { new: true });
};

/**
 * Subscribes a user to a funding plan by creating a payment record.
 * @param {string} userId - The ID of the user subscribing to the funding plan.
 * @param {string} planId - The ID of the funding plan the user is subscribing to.
 * @returns {Promise<IPayment>} - The payment record created for the subscription.
 * @throws {Error} - Throws an error if the funding plan is not found.
 */
export const subscribeToPlan = async (userId: string, planId: string) => {
  // Check if the funding plan exists
  const fundingPlan = await FundingModel.findById(planId);
  if (!fundingPlan) {
    throw new Error("Funding plan not found");
  }

  // Create a payment record for the subscription
  const payment = await PaymentModel.create({
    userId: new Types.ObjectId(userId),
    fundingId: new Types.ObjectId(planId), // Renamed from fundingPlanId to fundingId
    amount: fundingPlan.amountRaised, // Assuming amount is defined in the funding plan
    currency: "INR", // Default currency
    status: "PENDING",
  });

  // Update the user with the new payment ID
  await UserModel.findByIdAndUpdate(userId, {
    $push: { paymentIds: payment._id },
  });

  return payment;
};
