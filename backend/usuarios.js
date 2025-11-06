import express from "express";
import { db } from "./db.js";
import { validarId, verificarValidaciones } from "./validaciones.js";
import { body, param } from "express-validator";
import bcrypt from "bcrypt";
import { verificarAutenticacion, verificarAutorizacion } from "./auth.js";

const router = express.Router();

router.get("/", verificarAutenticacion, async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM usuarios");
  // RECORDAR Quitar la contraseña en la api
  res.json({
    success: true,
    usuarios: rows.map((u) => ({ ...u, password_hash: undefined })),
  });
});

router.get(
  "/:id",
  //Aqui si se autentica
  verificarAutenticacion,
  validarId,
  verificarValidaciones,
  //Aqui no se autentica
  //verificarAutenticacion,
  async (req, res) => {
    const id = Number(req.params.id);
    const [rows] = await db.execute(
      "SELECT id, email, nombre, activo FROM usuarios WHERE id=?",
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    res.json({ success: true, usuario: rows[0] });
  }
);

router.post(
  "/",
  verificarAutenticacion,
  body("email", "email inválido")
    .isAlphanumeric("es-ES")
    .isLength({ max: 20 }),
  body("nombre", "Nombre inválido").isAlpha("es-ES").isLength({ max: 50 }),
  body("password", "Contraseña inválida").isStrongPassword({
    minLength: 8, // Minimo de 8 caracteres
    minLowercase: 1, // Al menos una letra en minusculas
    minUppercase: 0, // Letras mayusculas opcionales
    minNumbers: 1, // Al menos un número
    minSymbols: 0, // Símbolos opcionales
  }),
  verificarValidaciones,
  async (req, res) => {
    const { email, nombre, password } = req.body;

    // Creamos Hash de la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    const [result] = await db.execute(
      "INSERT INTO usuarios (email, nombre, password_hash) VALUES (?,?,?)",
      [email, nombre, hashedPassword]
    );

    res.status(201).json({
      success: true,
      data: { id: result.insertId, email, nombre },
    });
  }
);

router.put("/:id", (req, res) => {});

router.delete(
  "/:id",
  verificarAutenticacion,
  validarId,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id);

    await db.execute("DELETE FROM usuarios WHERE id=?", [id]);
    res.json({ success: true, data: id });
  }
);

// Consultar por roles de usuario


export default router;
