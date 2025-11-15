import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../Auth";
import { useNavigate } from "react-router";

export const CrearViaje = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();

  const [errores, setErrores] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  const [values, setValues] = useState({
    conductor_id: "",
    vehiculo_id: "",
    fecha_salida: "",
    fecha_llegada: "",
    origen: "",
    destino: "",
    kilometros: "",
    observaciones: "",
  });

  const fetchConductores = useCallback(async () => {
    const response = await fetchAuth("http://localhost:3000/conductores");
    const data = await response.json();

    if (!response.ok || !data.success) {
      return console.log("Error al obtener conductores:", data.errores);
    }
    setConductores(data.data);
  }, [fetchAuth]);

  const fetchVehiculos = useCallback(async () => {
    const response = await fetchAuth("http://localhost:3000/vehiculos");
    const data = await response.json();

    if (!response.ok || !data.success) {
      return console.log("Error al obtener vehiculos:", data.errores);
    }
    
    setVehiculos(data.data);
  }, [fetchAuth]);

  useEffect(() => {
    fetchConductores();
    fetchVehiculos();
  }, [fetchConductores, fetchVehiculos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores([]);

    const response = await fetchAuth("http://localhost:3000/viajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      setErrores(data.errores || ["Error al crear viaje"]);
      return;
    }

    navigate("/viajes");
  };

  return (
    <article>
      <h2>Registrar viaje</h2>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Conductor</label>
          <select
            required
            value={values.conductor_id}
            onChange={(e) =>
              setValues({ ...values, conductor_id: e.target.value })
            }
          >
            <option value="">Selecciona un conductor</option>
            {conductores.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre} {c.apellido} ({c.dni})
              </option>
            ))}
          </select>

          <label>Vehiculo</label>
          <select
            required
            value={values.vehiculo_id}
            onChange={(e) =>
              setValues({ ...values, vehiculo_id: e.target.value })
            }
          >
            <option value="">Selecciona un vehiculo</option>
            {vehiculos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.marca} {v.modelo} ({v.patente})
              </option>
            ))}
          </select>

          <label>Fecha de salida</label>
          <input
            required
            type="date"
            value={values.fecha_salida}
            onChange={(e) =>
              setValues({ ...values, fecha_salida: e.target.value })
            }
          />

          <label>Fecha de llegada</label>
          <input
            required
            type="date"
            value={values.fecha_llegada}
            onChange={(e) =>
              setValues({ ...values, fecha_llegada: e.target.value })
            }
          />

          <label>Origen</label>
          <input
            required
            value={values.origen}
            onChange={(e) =>
              setValues({ ...values, origen: e.target.value })
            }
          />

          <label>Destino</label>
          <input
            required
            value={values.destino}
            onChange={(e) =>
              setValues({ ...values, destino: e.target.value })
            }
          />

          <label>Kilometros</label>
          <input
            required
            type="number"
            value={values.kilometros}
            onChange={(e) =>
              setValues({ ...values, kilometros: Number(e.target.value) })
            }
          />

          <label>Observaciones</label>
          <textarea
            value={values.observaciones}
            onChange={(e) =>
              setValues({ ...values, observaciones: e.target.value })
            }
          />

          {errores.length > 0 && (
            <div>
              {errores.map((error, i) => (
                <p key={i} style={{ color: "red" }}>
                  {error}
                </p>
              ))}
            </div>
          )}
        </fieldset>

        <input type="submit" value="Registrar viaje" />
      </form>
    </article>
  );
};

