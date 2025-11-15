import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../Auth";
import { useNavigate, useParams } from "react-router";

export const ModificarVehiculo = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState(null);
  const [errores, setErrores] = useState([]);

  const fetchVehiculo= useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/vehiculos/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error:", data.errores);
      return;
    }

    setValues(data.data);
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchVehiculo();
  }, [fetchVehiculo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores([]);

    const response = await fetchAuth(`http://localhost:3000/vehiculos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
       return window.alert("Error al modificar el vehiculo");
    }

    navigate("/vehiculos");
  };

  if (!values) return null;

  return (
    <article>
      <h2>Modificar vehiculo</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Marca</label>
          <input
            required
            value={values.marca}
            onChange={(e) => setValues({ ...values, marca: e.target.value })}
          />

          <label>Modelo</label>
          <input
            required
            value={values.modelo}
            onChange={(e) => setValues({ ...values, modelo: e.target.value })}
          />

          <label>Patente</label>
          <input
            required
            value={values.patente}
            onChange={(e) => setValues({ ...values, patente: e.target.value })}
          />

          <label>Año</label>
          <input
          type="number"
            required
            value={values.año}
            onChange={(e) => setValues({ ...values, año: Number(e.target.value) })}
          />

          <label>Capacidad de carga</label>
          <input
            required
            type="number"
            value={values.capacidad_carga}
            onChange={(e) =>
              setValues({ ...values, capacidad_carga: parseFloat(e.target.value) })
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
        <input type="submit" value="Guardar cambios" />
      </form>
    </article>
  );
};
