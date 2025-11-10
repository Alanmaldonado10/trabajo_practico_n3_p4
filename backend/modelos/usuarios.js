import { db } from "../db.js";

const Usuario = {
    registro: async (nombre, email, password) => {
        const [result] = await db.execute("INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)", [nombre, email, password])

        return result;
    },
    obtenerUsuario: async (email) => {
        const [rows] = await db.execute("SELECT * FROM usuarios WHERE email = ?", [email]);
        return rows[0];
    },
};

export default Usuario;