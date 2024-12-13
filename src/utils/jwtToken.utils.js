import jwt from "jsonwebtoken";
import environmentsConfig from "../config/environments.config.js";
export const generatedToken = (data) => {
    const token = jwt.sign(
        {
            sub: data.id_user,
            role: data.role,
        },
        'kajsbfana-ewdfjsaegksdagjnsfdiofgsd',
        {
            expiresIn: "1h",
        }
    );
    return token;
};
