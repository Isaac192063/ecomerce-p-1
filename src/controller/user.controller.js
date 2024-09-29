import {
    deleteUserModel,
    getAllUsersModel,
    getUserByIdModel,
    ifExistUsernameOrEmailUpdate,
    updateUserModel,
} from "../model/user.model.js";
import { hashPassword } from "../service/hashEncoder.service.js";
import { deleteImage, updateImage } from "../service/managmentImage.service.js";

async function updateUser(req, res) {
    try {
        let { name, lastname, username, password, email, image } = req.body;
        const { idUser } = req.params;

        const userModel = await getUserByIdModel(idUser);

        if (!userModel) {
            return res.status(404).json({
                success: false,
                message: "usuario no encontrado",
            });
        }

        if (password) {
            password = await hashPassword(password);
        }

        if (image) {
            image = updateImage(userModel.image, image, "profile");
        }

        if (username || email) {
            const validateUser = await ifExistUsernameOrEmailUpdate(email, username, idUser);
            if (validateUser) {
                return res.status(400).json({
                    success: false,
                    message: "Usuairo invalido, email o username ya existen",
                });
            }
        }

        const userUpdate = await updateUserModel(
            name || userModel.name,
            lastname || userModel.lastname,
            username || userModel.username,
            password || userModel.password,
            email || userModel.email,
            image || userModel.image,
            idUser
        );

        res.status(200).json({
            success: true,
            data: userUpdate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}

async function deleteUser(req, res) {
    const { idUser } = req.params;

    const userModel = await getUserByIdModel(idUser);

    if (!userModel) {
        return res.status(404).json({
            success: false,
            message: "usuario no encontrado",
        });
    }

    const userDelete = await deleteUserModel(idUser);
    deleteImage(userModel.image);

    return res.status(200).json({
        success: true,
        data: userDelete,
    });
}

async function getUserById(req, res) {
    const { idUser } = req.params;

    const user = await getUserByIdModel(idUser);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "no se encontro el usuario",
        });
    }

    res.status(200).json({
        success: true,
        data: user,
    });
}

async function getAllUser(req, res) {
    const users = await getAllUsersModel();

    console.log(users);

    res.status(200).json({
        sucess: true,
        data: users,
    });
}

export default {
    updateUser,
    deleteUser,
    getAllUser,
    getUserById,
};
