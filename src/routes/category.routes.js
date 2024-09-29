import { Router } from "express";
import categoryController from "../controller/category.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import {
    getCategoryById,
    newCategoryValidator,
    updateCategoryValidator,
} from "../validator/category.validator.js";
import { hasRole } from "../middleware/hasRole.middleware.js";

const categoryRoutes = Router();

categoryRoutes.post(
    "/category",
    hasRole("ADMIN"),
    validate(newCategoryValidator),
    categoryController.newCategory
);
categoryRoutes.put(
    "/category/:idCategory",
    hasRole("ADMIN"),
    validate(getCategoryById),
    validate(updateCategoryValidator),
    categoryController.updateCategory
);
categoryRoutes.delete(
    "/category/:idCategory",
    hasRole("ADMIN"),
    validate(getCategoryById),
    categoryController.deleteCategory
);
categoryRoutes.get("/category", categoryController.getAllCategory);
categoryRoutes.get(
    "/category/:idCategory",
    validate(getCategoryById),
    categoryController.getCategoryById
);
categoryRoutes.get(
    "/category/:idCategory/product",
    validate(getCategoryById),
    categoryController.getProductByCategory
);

export default categoryRoutes;
