import { param, validationResult } from "express-validator";

export const validarId = param("id").isInt({ min: 1 });


export const verificarValidaciones = (req, res, next) => {
  const validacion = validationResult(req);
  const mensajes = validacion.array().map((v) => v.msg)
  if (!validacion.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Falla de validacion",
      errores: mensajes,
    });
  }
  next();
};

export const formatearMinusculas = (dato) => {
  if (typeof dato === "string") {
    return dato.toLowerCase().trim()
  } else {
    return dato;
  }
};