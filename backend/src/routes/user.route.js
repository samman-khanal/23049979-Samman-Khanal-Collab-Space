//? Importing necessary modules and models.
import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controller.js";

const router = Router();

//* User profile routes with authentication middleware.
router.get("/me", auth, userController.me);
router.patch("/me", auth, userController.updateMe);
router.patch("/me/password", auth, userController.changePassword);

export default router;
