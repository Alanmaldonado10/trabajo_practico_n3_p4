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
    },
    obtenerPorId: async (id) => {
        let sql = "SELECT c.nombre AS nombre_conductor, c.apellido AS apellido_conductor, c.dni AS dni_conductor," +
            " v.marca, v.modelo, v.patente," +
            " vj.id AS id_viaje, vj.fecha_salida, vj.fecha_llegada, vj.origen, vj.destino, vj.kilometros, vj.observaciones" +
            " FROM viajes vj" +
            " JOIN conductores c ON c.id = vj.conductor_id JOIN vehiculos v ON v.id = vj.vehiculo_id WHERE vj.id = ?"

        const [rows] = await db.execute(sql, [id])
        return rows[0]
    }
}

export default Viaje