import { Router } from "express";
import productController from "../controller/product.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import {
    getProductByIdValidator,
    newProductValidate,
    updateProductValidate,
} from "../validator/product.validator.js";
import { hasRole } from "../middleware/hasRole.middleware.js";
const productRouter = Router();

productRouter.get("/product", productController.getAllProduct);

productRouter.get(
    "/product/:idProduct",
    validate(getProductByIdValidator),
    productController.getProductById
);

productRouter.post(
    "/product",
    hasRole("ADMIN"),
    validate(newProductValidate),
    productController.newProduct
);

productRouter.put(
    "/product/:idProduct",
    hasRole("ADMIN"),
    validate(getProductByIdValidator),
    validate(updateProductValidate),
    productController.updateProduct
);

productRouter.delete(
    "/product/:idProduct",
    validate(getProductByIdValidator),
    productController.deleteProduct
);

export default productRouter;
