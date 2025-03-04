import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";

/**
 * Creates a new user and sets the user as active by default.
 * @param {IUser} data - The data to create the new user.
 * @returns {Promise<IUser>} - The created user object.
 */
export const createUser = async (data: IUser): Promise<IUser> => {
  const result = await UserSchema.create({ ...data, active: true });
  return result.toObject();
};

/**
 * Updates an existing user's data.
 * @param {string} id - The ID of the user to update.
 * @param {IUser} data - The data to update the user with.
 * @returns {Promise<IUser | null>} - The updated user object or null if not found.
 */
export const updateUser = async (
  id: string,
  data: IUser
): Promise<IUser | null> => {
  const result = await UserSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

/**
 * Edits an existing user's data with partial information.
 * @param {string} id - The ID of the user to edit.
 * @param {Partial<IUser>} data - The partial data to update the user with.
 * @returns {Promise<IUser | null>} - The updated user object or null if not found.
 */
export const editUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  const result = await UserSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

/**
 * Deletes a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<any>} - The result of the deletion operation.
 */
export const deleteUser = async (id: string): Promise<any> => {
  const result = await UserSchema.deleteOne({ _id: id });
  return result;
};

/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<IUser | null>} - The user object with the specified ID or null if not found.
 */
export const getUserById = async (id: string): Promise<IUser | null> => {
  const result = await UserSchema.findById(id).lean();
  return result;
};

/**
 * Retrieves all users.
 * @returns {Promise<IUser[]>} - A list of all user objects.
 */
export const getAllUser = async (): Promise<IUser[]> => {
  const result = await UserSchema.find({}).lean();
  return result;
};

/**
 * Retrieves a user by their email.
 * @param {string} email - The email of the user to retrieve.
 * @param {boolean} [withPassword=false] - Whether to include the user's password in the result.
 * @returns {Promise<IUser | null>} - The user object with the specified email, or null if not found.
 */
export const getUserByEmail = async (
  email: string,
  withPassword = false
): Promise<IUser | null> => {
  if (withPassword) {
    const result = await UserSchema.findOne({ email })
      .select("+password")
      .lean();
    return result;
  }
  const result = await UserSchema.findOne({ email }).lean();
  return result;
};
