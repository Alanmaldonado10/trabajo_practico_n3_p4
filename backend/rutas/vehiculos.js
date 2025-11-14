import express from "express";
import vehiculoControlador from "../controladores/vehiculos.js";
import { validarBody  } from "../validaciones/vehiculos-val.js";
import { verificarValidaciones, validarId } from "../validaciones/verificar-validacion.js";

const router = express.Router();

router.get("/", vehiculoControlador.obtenerTodos);
router.get("/kilometros/:id", [validarId, verificarValidaciones], vehiculoControlador.obtenerKm);
router.post("/", [validarBody , verificarValidaciones], vehiculoControlador.crear);
router.put("/:id", [validarId, validarBody, verificarValidaciones], vehiculoControlador.actualizar);
router.delete("/:id", [validarId, verificarValidaciones], vehiculoControlador.eliminar);

export default router;