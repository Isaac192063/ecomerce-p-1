import { getCategoryByIdModel } from "../model/category.model.js";
import {
    getAllProductModel,
    getProductByIdModel,
    saveProductModel,
    deleteProductModel,
    updateProductModel,
    countProductModel,
} from "../model/product.model.js";
import { saveImage, updateImage } from "../service/managmentImage.service.js";

async function newProduct(req, res) {
    try {
        let { name, price, image, description, id_cty } = req.body;

        const categoryExist = await getCategoryByIdModel(id_cty);

        if (!categoryExist) {
            return res.status(404).json({
                success: false,
                message: "categoria no encontrada",
            });
        }

        if (image?.trim()) {
            console.log("creando imagen");
            image = saveImage(image, "product");
        }

        const data = await saveProductModel(name, price, image, description, id_cty);

        res.status(201).json({
            success: true,
            data: data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            data: "Error en el servidor",
        });
    }
}

async function updateProduct(req, res) {
    try {
        const { idProduct } = req.params;

        const data = await getProductByIdModel(idProduct);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        const { name, price, description, image } = req.body;

        const imageUpdate = updateImage(data.image, image, "product");

        const productUpdate = await updateProductModel(
            name || data.name,
            description || data.description,
            price || data.price,
            idProduct,
            imageUpdate || data.image
        );

        res.status(200).json({
            success: true,
            data: productUpdate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error interno en el servidor",
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const { idProduct } = req.params;

        const data = await getProductByIdModel(idProduct);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        const productDelete = await deleteProductModel(idProduct);

        return res.status(200).json({
            success: true,
            data: productDelete,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}

async function getProductById(req, res) {
    try {
        const { idProduct } = req.params;

        const data = await getProductByIdModel(idProduct);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}

async function getAllProduct(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;
        const data = await getAllProductModel(limit, offset);
        const { count } = await countProductModel();

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            success: true,
            data: {
                totalProducts: Number(count),
                totalPages: totalPages,
                currentPage: Number(page),
                products: data,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}

export default {
    newProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductById,
};
