import { Request, Response } from "express";
import { BankService } from "./bank.servies";
import { bankValidationSchema } from "./bank.validation";

export const createBank = async (req: Request, res: Response) => {
  try {
    const validatedData = bankValidationSchema.parse(req.body);
    const newBank = await BankService.createBank(validatedData);
    res.status(201).json({ success: true, data: newBank });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllBanks = async (req: Request, res: Response) => {
  try {
    const banks = await BankService.getAllBanks();
    res.status(200).json({ success: true, data: banks });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBankById = async (req: Request, res: Response) => {
  try {
    const bank = await BankService.getBankById(req.params.id);
    if (!bank)
      return res
        .status(404)
        .json({ success: false, message: "Bank not found" });
    res.status(200).json({ success: true, data: bank });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBank = async (req: Request, res: Response) => {
  try {
    const updatedBank = await BankService.updateBank(req.params.id, req.body);
    if (!updatedBank)
      return res
        .status(404)
        .json({ success: false, message: "Bank not found" });
    res.status(200).json({ success: true, data: updatedBank });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBank = async (req: Request, res: Response) => {
  try {
    const deletedBank = await BankService.deleteBank(req.params.id);
    if (!deletedBank)
      return res
        .status(404)
        .json({ success: false, message: "Bank not found" });
    res
      .status(200)
      .json({ success: true, message: "Bank deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
