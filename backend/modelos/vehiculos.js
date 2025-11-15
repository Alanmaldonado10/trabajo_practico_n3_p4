import { body } from "express-validator";
import { db } from "../db.js";

const Vehiculo = {
    obtenerTodos: async () => {
        const sql = "SELECT * FROM vehiculos";
        const [rows] = await db.execute(sql)
        return rows;
    },
    crear: async (marca, modelo, patente, año, capacidad_carga) => {
        const sql = "INSERT INTO vehiculos (marca, modelo, patente, año, capacidad_carga) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.execute(sql, [marca, modelo, patente, año, capacidad_carga]);
        return result;
    },
    actualizar: async (marca, modelo, patente, año, capacidad_carga, id) => {
        const sql = "UPDATE vehiculos SET marca=?, modelo=?, patente=?, año=?, capacidad_carga=? WHERE id=?";
        const [result] = await db.execute(sql, [marca, modelo, patente, año, capacidad_carga, id])
        return result
    }, 
    eliminar: async (id) => { 
        await db.execute("DELETE FROM vehiculos WHERE id=?", [id]);
    }, 
    obtenerKm: async(id) => {
        const sql = "SELECT SUM(kilometros) AS total_km FROM viajes WHERE vehiculo_id=?"
        const [rows] = await db.execute(sql, [id])
        return rows[0].total_km 
    },
    obtenerPatente: async (patente) => {
        const [rows] = await db.execute("SELECT * FROM vehiculos WHERE patente=?", [patente])
        return rows[0]
    },
     obtenerPorId: async (id) => {
        const [rows] = await db.execute("SELECT * FROM vehiculos WHERE id=?", [id])
        return rows[0]
    }
}

export default Vehiculo;
export const validarBody = [
    body("marca").isAlpha("es-ES", { ignore: " " }).notEmpty()
        .isLength({ min: 2 }),
    body("modelo")
        .isAlphanumeric("es-ES", { ignore: " " })
        .notEmpty()
        .isLength({ min: 2 }),
    body("patente")
        .isAlphanumeric("es-ES", { ignore: " -" })
        .notEmpty()
        .isLength({ min: 5 }),
    body("año")
        .notEmpty()
        .isInt({ min: 1990 })
        .custom((value) => {
            const hoy = new Date().getFullYear();
            const años = value;

            if (años > hoy) {
                throw new Error("El año del auto es erroneo");
            }
            return true;
        }),
    body("capacidad_carga")
        .notEmpty()
        .isFloat({ min: 50, max: 2000 })
];
