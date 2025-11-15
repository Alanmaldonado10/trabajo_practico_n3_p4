import { db } from "../db.js";

const Conductor = {
    obtener: async () => {
        const sql = "SELECT * FROM conductores"
        const [rows] = await db.execute(sql)
        return rows;
    },
    crear: async (nombre, apellido, dni, licencia, vencimiento_licencia) => {
        const sql = "INSERT INTO conductores (nombre, apellido, dni, licencia, vencimiento_licencia) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.execute(sql, [nombre, apellido, dni, licencia, vencimiento_licencia]);
        return result;
    },
    actualizar: async (nombre, apellido, dni, licencia, vencimiento_licencia, id) => {
        const sql = "UPDATE conductores SET nombre=?, apellido=?, dni=?, licencia=?, vencimiento_licencia=? WHERE id=?";
        await db.execute(sql, [nombre, apellido, dni, licencia, vencimiento_licencia, id])
    },
    eliminar: async (id) => {
        await db.execute("DELETE FROM conductores WHERE id=?", [id]);
    },
    obtenerKm: async (id) => {
        const sql = "SELECT SUM(kilometros) AS total_km FROM viajes WHERE conductor_id=?"
        const [rows] = await db.execute(sql, [id])
        return rows[0].total_km
    },
    obtenerxDni: async (dni) => {
        const [rows] = await db.execute("SELECT * FROM conductores WHERE dni=?", [dni])
        return rows[0]
    },
    obtenerPorId: async (id) => {
        const [rows] = await db.execute("SELECT * FROM conductores WHERE id=?", [id])
        return rows[0]
    }
}

export default Conductor;