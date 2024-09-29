import jwt from "jsonwebtoken";
import environmentsConfig from "../config/environments.config.js";

export const authMiddleware = (req, res, next) => {
    const headerToken = req.header("Authorization");

    if (!headerToken || !headerToken.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Error al autenticar al usuario",
        });
    }
    const token = headerToken.slice(7);

    jwt.verify(token, environmentsConfig.SECRET_KEY, (err, decoded) => {
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
