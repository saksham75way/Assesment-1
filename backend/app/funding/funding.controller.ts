import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as fundingService from "./funding.service";
import { createResponse } from "../common/helper/response.hepler";

//Controller for Create Funding.
export const createFunding = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await fundingService.createFunding(req.body);
    res.send(createResponse(result, "Funding plan created successfully"));
  }
);

//Controller for get all funding.
export const getAllFunding = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await fundingService.getAllFunding();
    res.send(createResponse(result));
  }
);

//Controller for single Funding.
export const getFundingById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await fundingService.getFundingById(req.params.id);
    res.send(createResponse(result));
  }
);
