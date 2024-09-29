import { checkSchema } from "express-validator";

export const authLoginValidator = checkSchema({
    username: {
        optional: true,
        trim: true,
        notEmpty: {
            negated: true,
        },
    },
    email: {
        optional: true,
        trim: true,
        notEmpty: {
            negated: true,
        },
        isEmail: true,
        errorMessage: "Provea un email valido",
    },
    password: {
        notEmpty: {
            negated: true,
        },
        errorMessage: "password requerido",
    },
});
