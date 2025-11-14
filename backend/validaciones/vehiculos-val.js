import { body } from "express-validator";

export const validarBody = [
  body("marca").isAlpha("es-ES", { ignore: " " }).notEmpty().isLength({ min: 2 }),
  body("modelo").isAlphanumeric("es-ES", { ignore: " " }).notEmpty().isLength({ min: 2 }),
  body("patente").isAlphanumeric("es-ES", { ignore: " -" }).notEmpty().isLength({ min: 5 }),
  body("año").notEmpty().isInt({ min: 1990 }).custom((value) => {
      const hoy = new Date().getFullYear();
      const años = value;

      if (años > hoy) {
        throw new Error("El año del auto es erroneo");
      }
      return true;
    }),
  body("capacidad_carga")
    .notEmpty()
    .isFloat({ min: 50, max: 2000 })
];
