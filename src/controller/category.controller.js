import {
    getAllCategoryModel,
    newCategoryModel,
    getCategoryByIdModel,
    updateCategoryModel,
    getProductByCategoryModel,
    deleteCategoryModel,
} from "../model/category.model.js";
import { deleteProductForCategoryModel } from "../model/product.model.js";

async function newCategory(req, res) {
    try {
        const { name, description } = req.body;

        const categorySave = await newCategoryModel(name, description);

        res.status(201).json({
            success: true,
            data: categorySave,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}
async function deleteCategory(req, res) {
    try {
        const { idCategory } = req.params;

        const category = await getCategoryByIdModel(idCategory);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "No se encontro la categoria",
            });
        }

        const categoryDelete = await deleteCategoryModel(idCategory);
        await deleteProductForCategoryModel(idCategory);

        res.status(200).json({
            success: true,
            data: categoryDelete,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}
async function updateCategory(req, res) {
    try {
        const { name, description } = req.body;
        const { idCategory } = req.params;

        const category = await getCategoryByIdModel(idCategory);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "No se encontro la categoria",
            });
        }

        const categoryUpdate = await updateCategoryModel(
            name || category.name,
            description || category.description,
            idCategory
        );

        res.status(200).json({
            success: true,
            data: categoryUpdate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}
async function getCategoryById(req, res) {
    try {
        const { idCategory } = req.params;

        const category = await getCategoryByIdModel(idCategory);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "No se encontro la categoria",
            });
        }

        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}
async function getAllCategory(req, res) {
    try {
        const categories = await getAllCategoryModel();

        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}

async function getProductByCategory(req, res) {
    try {
        const { idCategory } = req.params;

        const category = await getCategoryByIdModel(idCategory);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "No se encontro la categoria",
            });
        }

        const products = await getProductByCategoryModel(idCategory);

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}
export default {
    newCategory,
    deleteCategory,
    updateCategory,
    getAllCategory,
    getCategoryById,
    getProductByCategory,
};
