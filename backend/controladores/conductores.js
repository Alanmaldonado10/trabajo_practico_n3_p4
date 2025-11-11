import Conductor from "../modelos/conductores.js"
import { formatearMinusculas } from "../validaciones/verificar-validacion.js"

const conductorControlador = {
  obtener: async (req, res) => {
    try {
      const conductores = await Conductor.obtener();
      res.status(200).json({ success: true, data: conductores });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error al obtener los conductores" });
    }
  },
  crear: async (req, res) => {
    try {
      const { nombre, apellido, dni, licencia, vencimiento_licencia } = req.body;

      const verificacionDni = await Conductor.obtenerxDni(dni);

      if (verificacionDni) {
        return res.status(400)
          .json({ success: false, message: "Ya hay un conductor registrado con ese DNI" });
      }

      const nombreForm = formatearMinusculas(nombre)
      const apellidoForm = formatearMinusculas(apellido)

      const conductor = await Conductor.crear(nombreForm, apellidoForm, dni, licencia, vencimiento_licencia);

      res.status(201).json({
        success: true,
        data: {
          id: conductor.insertId,
          nombre: nombreForm,
          apellido: apellidoForm,
          dni,
          licencia,
          vencimiento_licencia
        }
      })

    } catch (error) {
      console.error(error)
      res.status(500).json({ success: false, message: "Error al crear el conductor" })
    }
  },
  actualizar: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { nombre, apellido, dni, licencia, vencimiento_licencia } = req.body;

      const conductor = await Conductor.obtenerxDni(dni);

      const nombreForm = formatearMinusculas(nombre)
      const apellidoForm = formatearMinusculas(apellido)

      if (conductor && conductor.id != id) {
        return res.status(400)
          .json({ success: false, message: "Ya hay un conductor registrado con ese DNI" });
      }

      await Conductor.actualizar(nombreForm, apellidoForm, dni, licencia, vencimiento_licencia, id);

      res
        .status(200)
        .json({
          success: true,
          data: {
            id,
            nombre: nombreForm,
            apellido: apellidoForm,
            dni,
            licencia,
            vencimiento_licencia
          }
        })

    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Error al actualizar el conductor" })
    }
  },

  eliminar: async (req, res) => {
    try {
      const id = Number(req.params.id)

      await Conductor.eliminar(id)

      res.status(200).json({ success: true, data: id })

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error al eliminar el conductor" })
    }
  },
  obtenerKm: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const kilometros = await Conductor.obtenerKm(id)

      if (!kilometros) {
        return res.status(200).json({ success: true, data: 0 })
      }

      res.status(200).json({ success: true, data: kilometros })

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Algo salio mal al mostrar los kilometros totales del conductor" })
    }
  }
}

export default conductorControlador