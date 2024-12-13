import { getCategoryByIdModel } from "../model/category.model.js";
import {
    getAllProductModelPagination,
    getProductByIdModel,
    saveProductModel,
    deleteProductModel,
    updateProductModel,
    countProductModel,
    saveImageDatabase,
    getAllProductModel,
} from "../model/product.model.js";
import { saveImage, updateImage } from "../service/managmentImage.service.js";

async function newProduct(req, res) {
    try {
        let { name, price, images, description, id_cty } = req.body;

        const categoryExist = await getCategoryByIdModel(id_cty);

        if (!categoryExist) {
            return res.status(404).json({
                success: false,
                message: "categoria no encontrada",
            });
        }

        if (images?.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Proporcione las imagenes",
            });
        }

        const data = await saveProductModel(name, price, description, id_cty);

        console.log(data);

        const listImage = saveImage(images, "product");
        console.log("creando imagen");

        const imagesSubmit = [];


        for (const element of listImage) {
            const imageSave = await saveImageDatabase(element, data.id_product);
            imagesSubmit.push(imageSave);
        }

        const dataSave = {
            ...data,
            image: imagesSubmit,
        };

        res.status(201).json({
            success: true,
            data: dataSave,
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

        const { name, price, description } = req.body;

        const productUpdate = await updateProductModel(
            name || data.name,
            description || data.description,
            price || data.price,
            idProduct,
        );

        res.status(200).json({
            success: true,
            data: productUpdate,
        });
    } catch (error) {
        console.log(error);
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
        console.log(data[0].status);

        const productDelete = await deleteProductModel(idProduct, !data[0].status);

        return res.status(200).json({
            success: true,
            data: productDelete,
        });
    } catch (error) {
        console.log(error);
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
        console.log(data);

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        const productos = data.reduce((acc, row) => {
            const { id_product, name, price, description, status, id_cty, url } = row;

            // Buscamos si el producto ya está en el acumulador
            let producto = acc.find(p => p.id_product === id_product);

            // Si no existe, lo agregamos con un arreglo vacío de imágenes
            if (!producto) {
                producto = {
                    id_product, name, price, description, status, id_cty, images: []
                };
                acc.push(producto); // Añadimos el producto al acumulador
            }

            // Si hay una imagen, la agregamos al producto
            if (url) {
                producto.images.push(url);
            }
            

            return acc;
        }, []);

        console.log(productos);

        res.status(200).json({
            success: true,
            data: productos[0],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}

async function getAllProductPagination(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;
        const data = await getAllProductModelPagination(limit, offset);
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

async function getAllProduct(req, res) {
    try {

        const data = await getAllProductModel();
        const productos = data.reduce((acc, row) => {
            const { id_product, name, price, description, status, id_cty, url } = row;

            // Buscamos si el producto ya está en el acumulador
            let producto = acc.find(p => p.id_product === id_product);

            // Si no existe, lo agregamos con un arreglo vacío de imágenes
            if (!producto) {
                producto = {
                    id_product, name, price, description, status, id_cty, images: []
                };
                acc.push(producto); // Añadimos el producto al acumulador
            }

            // Si hay una imagen, la agregamos al producto
            if (url) {
                producto.images.push(url);
            }

            return acc;
        }, []);

        res.status(200).json({
            success: true,
             data: productos,
        });
    } catch (error) {
        console.log(error);
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
     getAllProductPagination,
    getProductById,
    getAllProduct
};
