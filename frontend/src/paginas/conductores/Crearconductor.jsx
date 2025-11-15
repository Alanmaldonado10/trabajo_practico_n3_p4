import { useState } from "react";
import { useAuth } from "../../Auth";
import { useNavigate } from "react-router";

export const CrearConductor = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();
  const [errores, setErrores] = useState([]);

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    licencia: "",
    vencimiento_licencia: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores([]);

    const response = await fetchAuth("http://localhost:3000/conductores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      if (response.status === 400) {
        return setErrores(data.errores);
      }
      return window.alert("Error al crear el conductor");
    }

    navigate("/conductores");
  };

  return (
    <article>
      <h2>Crear conductor</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Nombre</label>
          <input
            required
            value={values.nombre}
            onChange={(e) => setValues({ ...values, nombre: e.target.value })}
          />

          <label>Apellido</label>
          <input
            required
            value={values.apellido}
            onChange={(e) => setValues({ ...values, apellido: e.target.value })}
          />

          <label>DNI</label>
          <input
            required
            type="number"
            value={values.dni}
            onChange={(e) => setValues({ ...values, dni: Number(e.target.value) })}
          />

          <label>Licencia</label>
          <input
            required
            value={values.licencia}
            onChange={(e) => setValues({ ...values, licencia: e.target.value })}
          />

          <label>Vencimiento de licencia</label>
          <input
            required
            type="date"
            value={values.vencimiento_licencia}
            onChange={(e) =>
              setValues({ ...values, vencimiento_licencia: e.target.value })
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
        <input type="submit" value="Crear conductor" />
      </form>
    </article>
  );
};
