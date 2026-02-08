//? Importing necessary modules and models.
import User from "../models/User.model.js";
import EmailVerification from "../models/EmailVerification.model.js";
import ResetPassword from "../models/ResetPassword.model.js";
import { hashPassword } from "../utils/hashPassword.util.js";
import { comparePassword } from "../utils/comparePassword.util.js";
import { signAccessToken } from "../utils/jwt.util.js";
import { generateToken } from "../utils/generateToken.util.js";
import { sendEmail } from "../utils/sendEmail.util.js";
import { verifyEmailTemplate } from "../utils/email/verifyEmail.emai.js";
import { resetPasswordTemplate } from "../utils/email/resetPassword.emai.js";

const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;

//* Service function to register a new user.
export const register = async ({ fullName, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists)
    throw Object.assign(new Error("Email already in use"), { statusCode: 409 });

  const user = await User.create({
    fullName,
    email,
    passwordHash: await hashPassword(password),
  });

  const token = generateToken(32);
  await EmailVerification.create({
    user: user._id,
    token,
    expiresAt: new Date(Date.now() + oneDay),
  });

  //* Sending verification email.
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const mailResult = await sendEmail({
    to: user.email,
    subject: "Verify your email - CollabSpace",
    html: verifyEmailTemplate({ name: user.fullName, verifyUrl }),
  });

  return {
    id: user._id,
    email: user.email,
    verificationEmailSent: !mailResult?.skipped,
    ...(process.env.NODE_ENV === "development" && mailResult?.error
      ? { verificationEmailError: mailResult.error }
      : {}),
  };
};

//* Service function to verify user's email.
export const verifyEmail = async ({ token }) => {
  const rec = await EmailVerification.findOne({ token, used: false });
  if (!rec)
    throw Object.assign(new Error("Invalid token"), { statusCode: 400 });
  if (rec.expiresAt < new Date())
    throw Object.assign(new Error("Token expired"), { statusCode: 400 });

  await User.updateOne({ _id: rec.user }, { isEmailVerified: true });
  rec.used = true;
  await rec.save();

  return { verified: true };
};

//* Service function to log in a user.
export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user)
    throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok)
    throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  const token = signAccessToken({ id: user._id, role: user.role });
  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    },
  };
};

//* Service function to handle forgot password requests.
export const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) return { sent: true };

  const token = generateToken(32);
  await ResetPassword.create({
    user: user._id,
    token,
    expiresAt: new Date(Date.now() + oneHour),
  });

  //* Sending reset password email.
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  await sendEmail({
    to: user.email,
    subject: "Reset your password - CollabSpace",
    html: resetPasswordTemplate({ resetUrl }),
  });

  return { sent: true };
};

//* Service function to reset user's password.
export const resetPassword = async ({ token, newPassword }) => {
  const rec = await ResetPassword.findOne({ token, used: false });
  if (!rec)
    throw Object.assign(new Error("Invalid token"), { statusCode: 400 });
  if (rec.expiresAt < new Date())
    throw Object.assign(new Error("Token expired"), { statusCode: 400 });

  await User.updateOne(
    { _id: rec.user },
    { passwordHash: await hashPassword(newPassword) },
  );
  rec.used = true;
  await rec.save();

  return { reset: true };
};
