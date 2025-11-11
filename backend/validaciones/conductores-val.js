import { body } from "express-validator";

export const validarBody = [
  body("nombre").isAlpha("es-ES", { ignore: " " }).notEmpty().isLength({ min: 2 }),
  body("apellido").isAlpha("es-ES", { ignore: " " }).notEmpty().isLength({ min: 2 }),
  body("dni").notEmpty().isInt().isLength({ min: 6, max: 9 }),
  body("licencia").notEmpty().isAlphanumeric("es-ES").isLength({ min: 1 }),
  body("vencimiento_licencia").notEmpty().isISO8601().custom((value) => {
      const hoy = new Date();
      const fecha = new Date(value);
      if (fecha < hoy) {
        throw new Error("La licencia esta vencida");
      }
      return true;
    }),
];