import { configDotenv } from "dotenv";

configDotenv();

export default {
    PORT: process.env.PORT,
    URL_DB: process.env.URL_DB,
    SECRET_KEY: process.env.SECRET_KEY,
    HOST: process.env.HOST
}