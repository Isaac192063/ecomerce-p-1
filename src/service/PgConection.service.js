import pgPromise from "pg-promise";
import environment from "../config/environments.config.js";

export default class PgConection {
    static instance;

    constructor() {
        if (PgConection.instance) {
            return PgConection.instance;
        }
        PgConection.instance = this;
        const pgp = pgPromise({});
        this.conection = pgp(environment.URL_DB);
        this.conection
            .connect()
            .then((obj) => {
                console.log("Me conecte " + obj.client.serverVersion);
                obj.done()
            })
            .catch((e) => {
                console.log("error",  e.message || e);
            });
    }
}
