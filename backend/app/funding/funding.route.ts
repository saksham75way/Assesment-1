import { Router } from "express";
import * as fundingController from "./funding.controller";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as fundingValidator from "./funding.validation";

const router = Router();

router
  .post(
    "/create",
    fundingValidator.createFunding,
    catchError,
    fundingController.createFunding
  )
  .get("/all", fundingController.getAllFunding)
  .get("/:id", fundingController.getFundingById);

export default router;
