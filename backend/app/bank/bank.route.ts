import { Router } from "express";
import * as BankController from "./bank.controller";

const router = Router();

router.post("/create", BankController.createBank);
router.get("/all", BankController.getAllBanks);
router.get("/:id", BankController.getBankById);
router.put("/:id", BankController.updateBank);
router.delete("/:id", BankController.deleteBank);

export default router;
