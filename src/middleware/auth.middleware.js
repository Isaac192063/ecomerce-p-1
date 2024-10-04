import jwt from "jsonwebtoken";
import environmentsConfig from "../config/environments.config.js";
import { getUserByIdModel } from "../model/user.model.js";

export const authMiddleware = (req, res, next) => {
    const headerToken = req.header("Authorization");

    if (!headerToken || !headerToken.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Error al autenticar al usuario",
        });
    }
    const token = headerToken.slice(7);

    jwt.verify(token, environmentsConfig.SECRET_KEY, async (err, decoded) => {
        console.log(decoded);

        let user;
        try {
            user = await getUserByIdModel(decoded.sub);
        } catch (error) {
          return res.status(500).json({
                success: false,
                message: "Error en el servidor",
            });
        }  

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Error al autenticar al usuario",
            });
        }

        if (err) {
            return res.status(401).json({
                success: false,
                message: "Error al autenticar al usuario",
            });
        }

        req.user = decoded;
        next();
    });
};
