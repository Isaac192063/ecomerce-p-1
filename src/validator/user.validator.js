import { checkSchema } from "express-validator";

export const newUserValidator = checkSchema({
    name: {
        trim: true,
        isEmpty:{
            negated: true,
            errorMessage: "Nombre es requerido"
        }
    },
    lastname: {
        trim: true,
        isEmpty:{
            negated: true,
            errorMessage: "apellido es requerido"
        }
    },
    birthdate: {
        trim: true,
        isEmpty:{
            negated: true,
            errorMessage: "fecha de nacimiento es requerido"
        }
    },
    username: {
        trim: true,
        isEmpty:{
            negated: true,
            errorMessage: "usuario es requerido"
        }
    },
    password: {
        isLength: {
            options:{
                max: 10,
                min: 6
            },
             errorMessage: "Longitud de contraseña no valida"
        }
    },
    email: {
        isEmail: {
            errorMessage: "Email no valido",
        },
    },
    role: {
        isIn: {
            errorMessage: "Rol no válido",
            options: [["ADMIN", "USER"]],
        },
    },
}, ['body']);

export const getUserByIdValidator = checkSchema({
    idUser: {
        isNumeric: true,
        errorMessage: "Identificador no valido"
    }
}, ['params'])
