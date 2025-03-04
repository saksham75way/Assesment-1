import express from "express";
import userRoutes from "./user/user.route";
import paymentRoutes from "./payment/payment.route";
import fundingRoutes from "./funding/funding.route";
import bankRoutes from "./bank/bank.route";

// routes
const router = express.Router();

router.use("/bank", bankRoutes);
router.use("/fundings", fundingRoutes);
router.use("/payments", paymentRoutes);
router.use("/users", userRoutes);

export default router;
