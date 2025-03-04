import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.hepler";
import { createUserTokens } from "../common/services/passport-jwt.service";
import * as userService from "./user.service";
import * as fundingService from "../funding/funding.service";
import * as paymentService from "../payment/payment.service";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.createUser(req.body);
  const { password, ...user } = result;
  res.send(createResponse(user, "User created successfully"));
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.updateUser(req.params.id, req.body);
  res.send(createResponse(result, "User updated successfully"));
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);
  res.send(createResponse(null, "User deleted successfully"));
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getUserById(req.params.id);
  res.send(createResponse(result));
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getAllUser();
  res.send(createResponse(result));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const tokens = createUserTokens(req.user!);
  res.send(createResponse(tokens));
});

export const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.user?._id!);
  res.send(createResponse(user));
});

export const donate = asyncHandler(async (req: Request, res: Response) => {
  const result = await paymentService.processDonation(
    req.user!._id,
    req.body.amount
  );
  res.send(createResponse(result, "Donation processed successfully"));
});

export const subscribeToFundingPlan = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await fundingService.subscribeToPlan(
      req.user!._id,
      req.body.planId
    );
    res.send(createResponse(result, "Subscription successful"));
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  // To do: Remove session
  res.send(createResponse({}));
});

export const editUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.editUser(req.params.id, req.body);
  res.send(createResponse(result, "User updated sucssefully"));
});
