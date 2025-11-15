import { useEffect, useState } from "react";
import { useAuth } from "../../Auth";
import { useParams } from "react-router";

export const DetallesViaje = () => {
  const { fetchAuth } = useAuth();
  const { id } = useParams();
  const [viaje, setViaje] = useState(null);
  const [errores, setErrores] = useState([]);

  useEffect(() => {
    const fetchViaje = async () => {
      setErrores([]);
      const response = await fetchAuth(`http://localhost:3000/viajes/${id}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrores(data.errores);
        return;
      }

      setViaje(data.data);
    };
    fetchViaje();
  }, [fetchAuth, id]);

  if (!viaje) return null;

  return (
    <article>
      <h2>Detalles del viaje</h2>
      <p><b>Conductor:</b> {viaje.nombre_conductor} {viaje.apellido_conductor} (DNI {viaje.dni_conductor})</p>
      <p><b>Vehiculo:</b> {viaje.marca} {viaje.modelo} - {viaje.patente}</p>
      <p><b>Origen:</b> {viaje.origen}</p>
      <p><b>Destino:</b> {viaje.destino}</p>
      <p><b>Salida:</b> {new Date(viaje.fecha_salida).toLocaleDateString()}</p>
      <p><b>Llegada:</b> {new Date(viaje.fecha_llegada).toLocaleDateString()}</p>
      <p><b>Kilometros:</b> {viaje.kilometros}</p>
      <p><b>Observaciones:</b> {viaje.observaciones}</p>

      {errores.length > 0 && (
        <div>
          {errores.map((error, i) => (
            <p key={i} style={{ color: "red" }}>{error}</p>
          ))}
        </div>
      )}
    </article>
  );
};
