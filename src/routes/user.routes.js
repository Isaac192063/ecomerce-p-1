import { Router } from "express";
import userController from '../controller/user.controller.js'
import { validate } from "../middleware/validator.middleware.js";
import { getUserByIdValidator } from "../validator/user.validator.js";
const userRouter = Router()

userRouter.get("/user", userController.getAllUser)
userRouter.get("/user/:idUser", validate(getUserByIdValidator), userController.getUserById)
userRouter.put("/user/:idUser", userController.updateUser)
userRouter.delete("/user/:idUser", userController.deleteUser)

export default userRouter;