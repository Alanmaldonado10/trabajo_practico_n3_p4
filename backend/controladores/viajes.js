import { formatearMinusculas } from "../validaciones/verificar-validacion.js";
import Viaje from "../modelos/viajes.js";

const viajeControlador = {
    obtenerTodos: async (req, res) => {
        try {
            const viajes = await Viaje.obtener();
            res.status(200).json({ success: true, data: viajes });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error al obtener los viajes" })
        }
    },
    crear: async (req, res) => {
        try {
            const { vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino,
                kilometros, observaciones } = req.body;

            const origenForm = formatearMinusculas(origen)
            const destinoForm = formatearMinusculas(destino)
            const observacionesForm = formatearMinusculas(observaciones)

            const viaje = await Viaje.crear(vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origenForm, destinoForm, kilometros, observacionesForm);

            res.status(201).json({
                success: true,
                data: {
                    id: viaje.insertId,
                    vehiculo_id,
                    conductor_id,
                    fecha_salida,
                    fecha_llegada,
                    origen: origenForm,
                    destino: destinoForm,
                    kilometros,
                    observaciones: observacionesForm
                }
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, message: "Error al crear el viaje" })
        }
    },
    actualizar: async (req, res) => {
        try {
            const id = Number(req.params.id)
            const { vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones } = req.body;

            const origenForm = formatearMinusculas(origen)
            const destinoForm = formatearMinusculas(destino)
            const observacionesForm = formatearMinusculas(observaciones)

            await Viaje.actualizar(vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origenForm, destinoForm, kilometros, observacionesForm, id)

            res.status(200).json({
                success: true, data: {
                    id,
                    vehiculo_id,
                    conductor_id,
                    fecha_llegada,
                    fecha_salida,
                    origen: origenForm,
                    destino: destinoForm,
                    kilometros,
                    observaciones: observacionesForm
                }
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error al actualizar el viaje" })
        }
    },
    eliminar: async (req, res) => {
        try {
            const id = Number(req.params.id)

            await Viaje.eliminar(id)

            res.status(200).json({ success: true, data: id })

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error al eliminar el viaje" })
        }
    },
    obtener: async (req, res) => {
        try {
            const { conductor, vehiculo } = req.query

            let sql = "SELECT c.nombre AS nombre_conductor, c.apellido AS apellido_conductor, c.dni AS dni_conductor," +
                " v.marca, v.modelo, v.patente," +
                " vj.id AS id_viaje, vj.fecha_salida, vj.fecha_llegada, vj.origen, vj.destino, vj.kilometros, vj.observaciones" +
                " FROM viajes vj" +
                " JOIN conductores c ON c.id = vj.conductor_id JOIN vehiculos v ON v.id = vj.vehiculo_id"
                
            
            const params = []

            if (conductor || vehiculo) {
                sql += " WHERE"
                if (conductor) {
                    sql += " vj.conductor_id = ?"
                    params.push(conductor)
                }
                if (vehiculo) {
                    if (conductor) {
                        sql += " AND"
                    }
                    sql += " vj.vehiculo_id = ?"
                    params.push(vehiculo)
                }

            }
            const viajes = await Viaje.obtener(sql, params)

            res.status(200).json({ success: true, data: viajes })

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Error al obtener los viajes del conductor" })
        }
    },
    obtenerPorId: async (req, res) => {
       try {
            const id = Number(req.params.id)

            const viaje = await Viaje.obtenerPorId(id);

            res.status(200).json({ success: true, data: viaje});

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, errores:["Error al obtener el viaje"] })
        }
    }
}

export default viajeControlador;