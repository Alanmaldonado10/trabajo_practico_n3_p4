import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../Auth";
import { Link } from "react-router";

export const Vehiculos = () => {
    const { fetchAuth } = useAuth();
    const [vehiculos, setVehiculos] = useState([]);
    const [error, setError] = useState(null);

    const fetchVehiculos = useCallback(async () => {
        try {
            const response = await fetchAuth("http://localhost:3000/vehiculos");
            const data = await response.json();

            if (!response.ok || !data.success) {
                console.log("Error:", data.errores);
                setError(data.errores);
                return;
            }

            setVehiculos(data.data);
            setError(null);
        } catch (err) {
            console.error("Errer al cargar los vehiculos:", err);
            setError("No se pudo cargar la lista de los vehiculos");
        }
    }, [fetchAuth]);

    useEffect(() => {
        fetchVehiculos();
    }, [fetchVehiculos]);

    const eliminarVehiculo = async (id) => {
        if (window.confirm("Estas seguro de eliminar el vehiculo?")) {
            try {
                const response = await fetchAuth(`http://localhost:3000/vehiculos/${id}`, {
                    method: "DELETE",
                });
                const data = await response.json();

                if (!response.ok || !data.success) {
                    return window.alert("Error al eliminar el vehiculo");
                }

                await fetchVehiculos();
            } catch (err) {
                console.error("Error al eliminar el vehiculo:", err);
                window.alert("Error al eliminar el vehiculo");
            }
        }
    };

    return (
        <article>
            <h2>Vehiculos</h2>

            <Link role="button" to="/vehiculos/crear" style={{ marginBottom: "12px", display: "inline-block" }}>
                Añadir
            </Link>

            {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Patente</th>
                        <th>Año</th>
                        <th>Capacidad de carga</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.length === 0 ? (
                        <tr>
                            <td colSpan="7">No hay vehiculos registrados</td>
                        </tr>
                    ) : (
                        vehiculos.map((v) => (
                            <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.marca}</td>
                                <td>{v.modelo}</td>
                                <td>{v.patente}</td>
                                <td>{v.año}</td>
                                <td>{v.capacidad_carga}</td>
                                <td>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <Link role="button" to={`/vehiculos/${v.id}`}>
                                            Ver
                                        </Link>
                                        <Link role="button" to={`/vehiculos/${v.id}/modificar`}>
                                            Editar
                                        </Link>
                                        <button onClick={() => eliminarVehiculo(v.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </article>
    );
};
