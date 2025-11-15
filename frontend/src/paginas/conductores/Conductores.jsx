import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../Auth";
import { Link } from "react-router";

export const Conductores = () => {
    const { fetchAuth } = useAuth();
    const [conductores, setConductores] = useState([]);
    const [error, setError] = useState(null);

    const fetchConductores = useCallback(async () => {
        try {
            const response = await fetchAuth("http://localhost:3000/conductores");
            const data = await response.json();

            if (!response.ok || !data.success) {
                console.log("Error:", data.errores);
                setError(data.errores);
                return;
            }

            setConductores(data.data);
            setError(null);
        } catch (err) {
            console.error("Error al cargar los conductores:", err);
            setError("No se pudo cargar la lista de conductores");
        }
    }, [fetchAuth]);

    useEffect(() => {
        fetchConductores();
    }, [fetchConductores]);

    const eliminarConductor = async (id) => {
        if (window.confirm("Estas seguro de eliminar el conductor?")) {
            try {
                const response = await fetchAuth(`http://localhost:3000/conductores/${id}`, {
                    method: "DELETE",
                });
                const data = await response.json();

                if (!response.ok || !data.success) {
                    return window.alert("Error al eliminar el conductor");
                }

                await fetchConductores();
            } catch (err) {
                console.error("Error al eliminar conductor:", err);
                window.alert("Error al eliminar conductor");
            }
        }
    };

    return (
        <article>
            <h2>Conductores</h2>

            <Link role="button" to="/conductores/crear" style={{ marginBottom: "12px", display: "inline-block" }}>
                Añadir
            </Link>

            {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Licencia</th>
                        <th>Vencimiento de la licencia</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {conductores.length === 0 ? (
                        <tr>
                            <td colSpan="7">No hay conductores registrados</td>
                        </tr>
                    ) : (
                        conductores.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.nombre}</td>
                                <td>{c.apellido}</td>
                                <td>{c.dni}</td>
                                <td>{c.licencia}</td>
                                <td>{new Date(c.vencimiento_licencia).toLocaleDateString()}</td>
                                <td>
                                    <div style={{ display: "flex", gap: "0.5rem" }}>
                                        <Link role="button" to={`/conductores/${c.id}`}>
                                            Ver
                                        </Link>
                                        <Link role="button" to={`/conductores/${c.id}/modificar`}>
                                            Editar
                                        </Link>
                                        <button onClick={() => eliminarConductor(c.id)}>
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