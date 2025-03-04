import { Router } from "express";
import * as paymentController from "./payment.controller";
import { roleAuth } from "../common/middleware/role-auth.middleware";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as paymentValidator from "./payment.validation";

const router = Router();

router
  .post(
    "/create",
    roleAuth(["ADMIN", "USER"]),
    paymentValidator.createPayment,
    catchError,
    paymentController.createPayment
  )
  .get("/all", roleAuth(["ADMIN"]), paymentController.getAllPayments)
  .get("/:id", roleAuth(["ADMIN", "USER"]), paymentController.getPaymentById)
  .patch(
    "/:id/status",
    roleAuth(["ADMIN"]),
    paymentController.updatePaymentStatus
  );

export default router;
