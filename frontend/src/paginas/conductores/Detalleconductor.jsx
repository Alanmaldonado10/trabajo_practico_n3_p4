import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../Auth";
import { useParams, Link } from "react-router";

export const DetallesConductor = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const [conductor, setConductor] = useState(null);
  const [kilometros, setKilometros] = useState(null);

  const fetchConductor = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/conductores/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error al consultar por el conductor:", data.errores);
      return;
    }

    setConductor(data.data);
  }, [fetchAuth, id]);

  const fetchKilometros = useCallback(async () => {
    const response = await fetchAuth(
      `http://localhost:3000/conductores/kilometros/${id}`
    );
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error al consultar por los kilometros:", data.errores);
      return;
    }

    setKilometros(data.data ?? 0); 
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchConductor();
    fetchKilometros();
  }, [fetchConductor, fetchKilometros]);

  if (!conductor) return null

  return (
    <article>
      <h2>Detalles del conductor</h2>
      <p><b>Nombre:</b> {conductor.nombre}</p>
      <p><b>Apellido:</b> {conductor.apellido}</p>
      <p><b>DNI:</b> {conductor.dni}</p>
      <p><b>Licencia:</b> {conductor.licencia}</p>
      <p><b>Vencimiento:</b> {new Date(conductor.vencimiento_licencia).toLocaleDateString()}</p>
      <p><b>Kilometros totales: </b> 
        {kilometros === 0                                                     
            ? "No hay viajes registrados"
            : kilometros}
      </p>

      <Link role="button" to={`/conductores/${id}/modificar`}>
        Modificar
      </Link>
    </article>
  );
};
