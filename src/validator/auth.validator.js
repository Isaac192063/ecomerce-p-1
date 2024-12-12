import { checkSchema } from "express-validator";

export const authLoginValidator = checkSchema({
    identification: {
        optional: true,
        trim: true,
        notEmpty: {
            negated: true,
        },
        errorMessage: "Provea una identificacion valida",
    },
    password: {
        notEmpty: {
            negated: true,
        },
        errorMessage: "password requerido",
    },
});
