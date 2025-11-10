import { body } from "express-validator";

export const validarEmail = [
    body("email")
        .notEmpty().withMessage("El email no puede estar vacio")
        .matches("^[a-zA-Z0-9.@]+$").withMessage("El email no puede contener caracteres especiales")
        .isEmail().withMessage("El email debe contener arroba y dominio")
]

export const validarContraseña = [
    body("contraseña")
        .notEmpty().withMessage("La contraseña no puede estar vacia")
        .isStrongPassword({
            minLength: 8, // Minimo de 8 caracteres
            minLowercase: 1, // Al menos una letra en minusculas
            minUppercase: 0, // Letras mayusculas opcionales
            minNumbers: 1, // Al menos un número
            minSymbols: 0, // Símbolos opcionales
        }).withMessage("La contraseña debe contener al menos 8 caracteres, una letra en minuscula y un numero")];

export const validarNombre = [
    body("nombre")
        .notEmpty().withMessage("El nombre no puede estar vacio")
        .isAlpha("es-ES", { ignore: " " }).withMessage("El nombre no puede contener caracteres especiales")
        .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 letras")
]
