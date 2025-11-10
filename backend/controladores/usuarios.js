import Usuario from "../modelos/usuarios.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { formatearMinusculas } from "../validaciones/verificar-validacion.js";

const usuarioControlador = {
    registro: async (req, res) => {
        try {
            const { nombre, email, contraseña } = req.body

            const usuarioExistente = await Usuario.obtenerUsuario(email);

            if (usuarioExistente) return res.status(400).json({ success: false, message: "Ese email ya esta registrado" })

            const passwordHasheada = await bcrypt.hash(contraseña, 12);

            const nombreForm = formatearMinusculas(nombre)
            const emailForm = formatearMinusculas(email)

            const usuario = await Usuario.registro(nombreForm, emailForm, passwordHasheada);

            res.status(201).json({
                success: true, data: {
                    id: usuario.insertId,
                    nombre: nombreForm,
                    email: emailForm
                }
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, message: "Error al registrar al usuario" })
        }
    },
    login: async (req, res) => {
        try {
            const { email, contraseña } = req.body;

            const emailForm = formatearMinusculas(email)

            const usuario = await Usuario.obtenerUsuario(emailForm);

            if (!usuario) {
                return res.status(400).json({ success: false, errores: ["Email o contraseña incorrecta"] });
            }

            const comparacion = await bcrypt.compare(contraseña, usuario.password_hash);
            if (!comparacion) {
                return res.status(400).json({ success: false, errores: ["Email o contraseña incorrecta"] });
            }

            const payload = { id: usuario.id, email: usuario.email }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "4h"
            });

            res.status(200).json({ success: true, token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error al intentar iniciar sesion" });
        }
    },
};

export default usuarioControlador;