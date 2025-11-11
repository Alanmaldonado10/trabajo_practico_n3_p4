import express from "express"
import conductorControlador from "../controladores/conductores.js"
import { validarBody } from "../validaciones/conductores-val.js";
import { verificarValidaciones, validarId } from "../validaciones/verificar-validacion.js";

const router = express.Router();

router.get("/", conductorControlador.obtener)
router.get("/kilometros/:id", [validarId, verificarValidaciones], conductorControlador.obtenerKm);
router.post("/", [validarBody , verificarValidaciones], conductorControlador.crear)
router.put("/:id", [validarId, validarBody , verificarValidaciones], conductorControlador.actualizar)
router.delete("/:id", [validarId,verificarValidaciones], conductorControlador.eliminar)

export default router;