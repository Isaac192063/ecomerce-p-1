import { checkSchema } from "express-validator";

export const getCategoryById = checkSchema(
    {
        idCategory: {
            isNumeric: true,
            errorMessage: "parametro de la categoria requerida",
        },
    },
    ["params"]
);

export const newCategoryValidator = checkSchema(
    {
        name: {
            trim: true,
            isEmpty: {
                negated: true,
                errorMessage: "nombre requerido",
            },
        },
        description: {
            trim: true,
            isEmpty: {
                negated: true,
                errorMessage: "descripción requerida",
            },
        },
    },
    ["body"]
);

export const updateCategoryValidator = checkSchema({
    name: {
        trim: true,
        optional: true,
        isEmpty: {
            negated: true,
            errorMessage: "nombre requerido",
        },
    },
    description: {
        trim: true,
        optional: true,
        isEmpty: {
            negated: true,
            errorMessage: "descripción requerida",
        },
    },
}, ['body']);
