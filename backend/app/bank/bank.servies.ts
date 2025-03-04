import { Bank } from "./bank.schema";
import { IBank } from "./bank.dto";

/**
 * Service class for handling operations related to the Bank model.
 */
export class BankService {
  /**
   * Create a new bank.
   * @param {IBank} data - The bank data to be created.
   * @returns {Promise<IBank>} - The created bank.
   */
  static async createBank(data: IBank): Promise<IBank> {
    return await Bank.create(data);
  }

  /**
   * Get all banks.
   * @returns {Promise<IBank[]>} - A list of all banks.
   */
  static async getAllBanks(): Promise<IBank[]> {
    return await Bank.find();
  }

  /**
   * Get a bank by its ID.
   * @param {string} id - The ID of the bank to retrieve.
   * @returns {Promise<IBank | null>} - The bank with the specified ID or null if not found.
   */
  static async getBankById(id: string): Promise<IBank | null> {
    return await Bank.findById(id);
  }

  /**
   * Update a bank by its ID.
   * @param {string} id - The ID of the bank to update.
   * @param {Partial<IBank>} data - The data to update the bank with.
   * @returns {Promise<IBank | null>} - The updated bank or null if not found.
   */
  static async updateBank(
    id: string,
    data: Partial<IBank>
  ): Promise<IBank | null> {
    return await Bank.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Delete a bank by its ID.
   * @param {string} id - The ID of the bank to delete.
   * @returns {Promise<IBank | null>} - The deleted bank or null if not found.
   */
  static async deleteBank(id: string): Promise<IBank | null> {
    return await Bank.findByIdAndDelete(id);
  }
}
