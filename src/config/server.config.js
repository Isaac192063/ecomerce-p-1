import environment from "../config/environments.config.js";
import express from "express";
import logger from "morgan";
import indexRouter from "../routes/index.routes.js";
import PgConection from "../service/PgConection.service.js";
import cors from 'cors';

export default class Server {
    constructor() {
        this.port = environment.PORT;
        this.host = environment.HOST;
        this.app = express();
    }

    middlewares() {
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
        this.app.use(logger("dev"));
        this.app.use(cors())
    }

    routes() {
        this.app.use(express.static("src/public", {extensions: ["jpeg"]}))
        this.app.use(indexRouter);
    }

    initDatabase() {
        new PgConection();
    }

    runServer() {
        this.initDatabase();
        this.middlewares();
        this.routes();
        this.app.listen(this.port, () => {
            console.log(`listen url http://${this.host}:${this.port}`);
        });
    }
}
