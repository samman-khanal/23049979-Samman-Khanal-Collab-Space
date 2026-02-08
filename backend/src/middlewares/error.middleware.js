//? Importing necessary modules and models.
import { HTTP } from "../constants/httpStatus.constant.js";

//* Middleware function to handle errors in the application.
export default function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.statusCode || HTTP.SERVER_ERROR;
  res.status(status).json({
    message: err.message || "Server error",
    ...(process.env.NODE_ENV === "development"
      ? {
          stack: err.stack,
          ...(err.meta ? { meta: err.meta } : {}),
        }
      : {}),
  });
}
