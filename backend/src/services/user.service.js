//? Importing necessary modules and models.
import User from "../models/User.model.js";
import { hashPassword } from "../utils/hashPassword.util.js";

//* Service function to get the current user's details.
export const getMe = async (userId) =>
  User.findById(userId).select("-passwordHash");

//* Service function to update the current user's details.
export const updateMe = async (userId, patch) => {
  const allowed = ["fullName", "avatarUrl"];
  const update = {};
  for (const k of allowed) if (patch[k] !== undefined) update[k] = patch[k];

  return User.findByIdAndUpdate(userId, update, { new: true }).select(
    "-passwordHash",
  );
};

//* Service function to change the current user's password.
export const changePassword = async (userId, newPassword) => {
  await User.updateOne(
    { _id: userId },
    { passwordHash: await hashPassword(newPassword) },
  );
  return { changed: true };
};
