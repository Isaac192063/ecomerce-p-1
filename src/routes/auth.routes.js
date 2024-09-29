import { Router } from "express";
import authController from "../controller/auth.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { newUserValidator } from "../validator/user.validator.js";
import { authLoginValidator } from "../validator/auth.validator.js";

const authRouter = Router();

authRouter.post("/login",  validate(authLoginValidator), authController.loginUser);
authRouter.post("/register", validate(newUserValidator),authController.registerUser);

export default authRouter;
