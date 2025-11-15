import { useState } from "react";
import { useAuth } from "../../Auth";
import { useNavigate } from "react-router";

export const CrearVehiculo = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();
  const [errores, setErrores] = useState([]);

  const [values, setValues] = useState({
    marca: "",
    modelo: "",
    patente: "",
    año: "",
    capacidad_carga: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores([]);

    const response = await fetchAuth("http://localhost:3000/vehiculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 400) {
        return setErrores(data.errores);
      }
      return window.alert("Error al crear el vehiculo");
    }

    navigate("/vehiculos");
  };

  return (
    <article>
      <h2>Crear vehiculo</h2>
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

          <label>Capacidad de carga (kg)</label>
          <input
            type="number"
            required
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
        <input type="submit" value="Crear vehiculo" />
      </form>
    </article>
  );
};
