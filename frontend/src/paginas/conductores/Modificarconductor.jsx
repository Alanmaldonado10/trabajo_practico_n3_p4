import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../Auth";
import { useNavigate, useParams } from "react-router";

export const ModificarConductor = () => {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState(null);
  const [errores, setErrores] = useState([]);

  const fetchConductor = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/conductores/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error:", data.errores);
      return;
    }

    setValues(data.data);
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchConductor();
  }, [fetchConductor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores([]);

    const response = await fetchAuth(`http://localhost:3000/conductores/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return window.alert("Error al modificar el conductor");
    }

    navigate("/conductores");
  };

  if (!values) return null;

  return (
    <article>
      <h2>Modificar conductor</h2>
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
              {errores.map((errores, i) => (
                <p key={i} style={{ color: "red" }}>
                  {errores}
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