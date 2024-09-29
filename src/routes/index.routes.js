import { Router } from "express";
import authRouter from "./auth.routes.js";
import productRouter from "./product.routes.js";
import userRouter from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/api", authMiddleware, productRouter);
indexRouter.use("/api", authMiddleware, userRouter);
indexRouter.use("/api", authMiddleware, categoryRoutes);

export default indexRouter;
