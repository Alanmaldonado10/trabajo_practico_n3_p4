import express from "express"
import usuarioControlador from "../controladores/usuarios.js"
import { validarNombre, validarEmail, validarContraseña } from "../validaciones/usuarios-validacion.js";
import { verificarValidaciones } from "../validaciones/verificar-validacion.js";

const router = express.Router();

router.post("/registro", [validarNombre, validarEmail, validarContraseña, verificarValidaciones], usuarioControlador.registro)
router.post("/login",[validarEmail, validarContraseña, verificarValidaciones], usuarioControlador.login)

export default router;