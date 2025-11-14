import { db } from "../db.js"

const Viaje = {
    obtener: async (sql, params) => {
        const [rows] = await db.execute(sql, params)
        return rows
    },
    crear: async (vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones) => {
        const params = [vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones]

        const sql = "INSERT INTO viajes (vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        const [result] = await db.execute(sql, params);
        return result;
    },
    actualizar: async (vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones, id) => {
        const params = [vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones, id]

        const sql = "UPDATE viajes SET vehiculo_id=?, conductor_id=?, fecha_salida=?, fecha_llegada=?, origen=?, destino=?, kilometros=?, observaciones=? WHERE id=?"

        await db.execute(sql, params)
    },
    eliminar: async (id) => {
        await db.execute("DELETE FROM viajes WHERE id=?", [id])
    }
}

export default Viaje