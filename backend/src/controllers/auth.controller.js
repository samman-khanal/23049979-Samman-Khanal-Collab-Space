//? Importing necessary modules and models.
import * as authService from "../services/auth.service.js";
import { HTTP } from "../constants/httpStatus.constant.js";

//* Controller function to register a new user.
export const register = async (req, res, next) => {
  try {
    const fullName = req.body?.fullName ?? req.body?.fullname;
    const { email, password } = req.body;
    const data = await authService.register({ fullName, email, password });
    res.status(HTTP.CREATED).json(data);
  } catch (e) {
    next(e);
  }
};

//* Controller function to verify user's email.
export const verifyEmail = async (req, res, next) => {
  try {
    const token = req.params?.token || req.query?.token || req.body?.token;
    const data = await authService.verifyEmail({ token });
    res.json(data);
  } catch (e) {
    next(e);
  }
};

//* Controller function to log in a user.
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login({ email, password });
    res.json(data);
  } catch (e) {
    next(e);
  }
};

//* Controller function to handle forgot password requests.
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await authService.forgotPassword({ email });
    res.json(data);
  } catch (e) {
    next(e);
  }
};

//* Controller function to reset user's password.
export const resetPassword = async (req, res, next) => {
  try {
    const token = req.params?.token || req.body?.token;
    const { newPassword } = req.body;
    const data = await authService.resetPassword({ token, newPassword });
    res.json(data);
  } catch (e) {
    next(e);
  }
};
