import express from "express"
import viajeControlador from "../controladores/viajes.js"
import { verificarValidaciones, validarId } from "../validaciones/verificar-validacion.js";
import { validarBody, validarQuerys } from "../validaciones/viajes-val.js";


const router = express.Router()

router.get("/", [validarQuerys, verificarValidaciones], viajeControlador.obtener)
router.post("/", [validarBody, verificarValidaciones], viajeControlador.crear);
router.put("/:id", [validarId, validarBody, verificarValidaciones], viajeControlador.actualizar);
router.delete("/:id", [validarId, verificarValidaciones], viajeControlador.eliminar);

export default router;