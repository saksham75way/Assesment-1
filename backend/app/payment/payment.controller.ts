import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.hepler";
import * as paymentService from "./payment.service";

//Controller for Create Payment.
export const createPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await paymentService.createPayment(req.body);
    res.send(createResponse(result, "Payment created successfully"));
  }
);

//Controller for get payment by id.
export const getPaymentById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await paymentService.getPaymentById(req.params.id);
    res.send(createResponse(result));
  }
);

//Controller for get all payments.
export const getAllPayments = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await paymentService.getAllPayments();
    res.send(createResponse(result));
  }
);

//Controller for Update payment.
export const updatePaymentStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await paymentService.updatePaymentStatus(
      req.params.id,
      req.body.status
    );
    res.send(createResponse(result, "Payment status updated successfully"));
  }
);
