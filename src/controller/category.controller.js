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
    const { name, description } = req.body;

    const categorySave = await newCategoryModel(name, description);

    res.status(201).json({
        success: true,
        data: categorySave,
    });
}
async function deleteCategory(req, res) {
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
}
async function updateCategory(req, res) {
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
}
async function getCategoryById(req, res) {
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
}
async function getAllCategory(req, res) {
    const categories = await getAllCategoryModel();

    res.status(200).json({
        success: true,
        data: categories,
    });
}

async function getProductByCategory(req, res) {
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
}
export default {
    newCategory,
    deleteCategory,
    updateCategory,
    getAllCategory,
    getCategoryById,
    getProductByCategory,
};
