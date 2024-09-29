import { checkSchema } from "express-validator";

export const getProductByIdValidator = checkSchema(
    {
        idProduct: {
            trim: true,
            escape: true,
            matches: {
                options: [/^[0-9]+$/], 
                errorMessage: "El identificador debe ser un número válido",
            },
            errorMessage: "El identificador no es válido",
        },
    },
    ["params"]
);

export const newProductValidate = checkSchema(
    {
        name: {
            isEmpty: {
                negated: true,
                errorMessage: "el valor es requerido",
            },
        },
        price: {
            isNumeric: true,
            isFloat: { 
                options: { min: 0.01 }, 
                errorMessage: "precio no valido",
            },
            isEmpty: {
                negated: true,
                errorMessage: "el valor es requerido",
            },
            errorMessage: "Ingrese un valor valido",
        },
        description: {
            isEmpty: {
                negated: true,
                errorMessage: "el valor es requerido",
            },
        },
        id_cty: {
            isNumeric: true,
            isEmpty: {
                negated: true,
                errorMessage: "el valor es requerido",
            },
            errorMessage: "Ingrese un valor valido",
        },
    },
    ["body"]
);


export const updateProductValidate = checkSchema(
    {
        name: {
            optional: true,
            trim: true,
            isEmpty: {
                negated: true,
                errorMessage: "el valor es requerido",
            },
        },
        price: {
            isNumeric: true,
            optional: true,
            isFloat: { 
                options: { min: 0.01 }, 
                errorMessage: "precio no valido",
            },
            errorMessage: "Ingrese un valor valido",
        },
        description: {
            optional: true,
            trim: true,
            isEmpty: {
                negated: true,
                errorMessage: "el valor es requerido",
            },
        },
    },
    ["body"]
);