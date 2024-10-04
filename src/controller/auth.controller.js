import { authenticationModel, ifExistUsernameOrEmail, newUserModel } from "../model/user.model.js";
import { hashPassword, verfiedPassword } from "../service/hashEncoder.service.js";
import { saveImage } from "../service/managmentImage.service.js";
import { generatedToken } from "../utils/jwtToken.utils.js";

async function registerUser(req, res) {
    try {
        const user = req.body;
        const passwordEncrypt = await hashPassword(user.password);
        user.password = passwordEncrypt;

        if (await ifExistUsernameOrEmail(user.email, user.username)) {
            return res.status(400).json({
                success: true,
                message: "Usuario invalido, el usuario o el email ya existen",
            });
        }

        if (user.image) {
            user.image = saveImage(user.image, "profile");
        }

        const userSave = await newUserModel(user);

        res.status(201).json({
            sucess: true,
            data: userSave,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}
async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const userAuthenticate = await authenticationModel(email, username);

        if (!userAuthenticate) {
            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado",
            });
        }

        if (!(await verfiedPassword(password, userAuthenticate.password))) {
            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado",
            });
        }

        const token = generatedToken(userAuthenticate);

        res.status(200).json({
            success: true,
            message: "Usuario autorizado",
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error en el servidor",
        });
    }
}

export default {
    registerUser,
    loginUser,
};
