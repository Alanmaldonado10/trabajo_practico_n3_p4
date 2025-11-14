import { body, query } from "express-validator";

export const validarBody = [
  body("vehiculo_id").notEmpty().isInt({ min: 1 }).toInt(),
  body("conductor_id").notEmpty().isInt({ min: 1 }).toInt(),
  body("fecha_salida").notEmpty().isISO8601()
    .custom((value) => {
      const salida = new Date(value);
      const hoy = new Date();
      if (salida > hoy) {
        throw new Error("La fecha de salida no puede ser superior hoy");
      }
      return true;
    }),
  body("fecha_llegada").notEmpty().isISO8601()
    .custom((value, { req }) => {
      const salida = new Date(req.body.fecha_salida);
      const llegada = new Date(value);
      if (llegada < salida) {
        throw new Error("La fecha de llegada no puede ser antes que la salida");
      }
      return true;
    }),
  body("origen").notEmpty().isAlpha("es-ES", {ignore: " "}).isLength({ min: 2, max: 50 }),
  body("destino").notEmpty().isAlpha("es-ES", {ignore: " "}).isLength({ min: 2, max: 50 }),
  body("kilometros").notEmpty().isFloat({ min: 1 }).toFloat(),
  body("observaciones").notEmpty().isAlphanumeric("es-ES", {ignore: " .,-/"}).isLength({ max: 255 }),
];

export const validarQuerys = [
  query("conductor").optional().isInt({ min: 1 }).toInt(),
  query("vehiculo").optional().isInt({ min: 1 }).toInt()
];