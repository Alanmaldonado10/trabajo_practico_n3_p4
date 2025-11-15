import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../Auth";
import { useParams, Link } from "react-router";

export const DetallesVehiculo = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();

  const [vehiculo, setVehiculo] = useState(null);
  const [kilometros, setKilometros] = useState(null);

  const fetchVehiculo = useCallback(async () => {
    const response = await fetchAuth(`http://localhost:3000/vehiculos/${id}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error:", data.errores);
      return;
    }

    setVehiculo(data.data);
  }, [fetchAuth, id]);

  const fetchKilometros = useCallback(async () => {
    const response = await fetchAuth(
      `http://localhost:3000/vehiculos/kilometros/${id}`
    );
    const data = await response.json();

    if (!response.ok || !data.success) {
      console.log("Error:", data.errores);
      return;
    }

    setKilometros(data.data ?? 0);
  }, [fetchAuth, id]);

  useEffect(() => {
    fetchVehiculo();
    fetchKilometros();
  }, [fetchVehiculo, fetchKilometros]);

  if (!vehiculo) return null;

  return (
    <article>
      <h2>Detalles del vehiculo</h2>
      <p><b>Marca:</b> {vehiculo.marca}</p>
      <p><b>Modelo:</b> {vehiculo.modelo}</p>
      <p><b>Patente:</b> {vehiculo.patente}</p>
      <p><b>Año:</b> {vehiculo.año}</p>
      <p><b>Capacidad de carga:</b> {vehiculo.capacidad_carga}</p>
      <p><b>Kilometros totales: </b> 
        {kilometros === 0
            ? "No hay viajes registrados"
            : kilometros}
      </p>

      <Link role="button" to={`/vehiculos/${id}/modificar`}>
        Modificar
      </Link>
    </article>
  );
};
