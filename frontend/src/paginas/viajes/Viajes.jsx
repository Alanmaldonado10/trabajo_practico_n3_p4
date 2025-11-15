import { useEffect, useState } from "react";
import { useAuth } from "../../Auth";
import { Link } from "react-router";

export const Viajes = () => {
    const { fetchAuth } = useAuth();
    const [viajes, setViajes] = useState([]);
    const [conductores, setConductores] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [errores, setErrores] = useState([]);
    const [filtros, setFiltros] = useState({
        conductor: "",
        vehiculo: ""
    });

    const fetchOpciones= async () => {
        try {

            const responseConductores = await fetchAuth("http://localhost:3000/conductores")
            const responseVehiculos = await fetchAuth("http://localhost:3000/vehiculos")
            

            const dataConductores = await responseConductores.json();
            const dataVehiculos = await responseVehiculos.json();

            if (responseConductores.ok && dataConductores.success) {
                setConductores(dataConductores.data);
            }

            if (responseVehiculos.ok && dataVehiculos.success) {
                setVehiculos(dataVehiculos.data);
            }
        } catch (err) {
            console.error("Error al cargar las listas:", err.message);
        }
    };

    const fetchViajes = async () => {
        setErrores([]);
        try {
            const query = new URLSearchParams();
            if (filtros.conductor) query.append("conductor", filtros.conductor);
            if (filtros.vehiculo) query.append("vehiculo", filtros.vehiculo);

            const response = await fetchAuth(`http://localhost:3000/viajes?${query.toString()}`);
            const data = await response.json();

            if (!response.ok || !data.success) {
                setErrores(data.errores);
                return;
            }

            setViajes(data.data);
        } catch (err) {
            setErrores([err.message]);
        }
    };

    useEffect(() => {
        fetchOpciones();
        fetchViajes();
    }, []);

    return (
        <article>
            <h2>Listado de viajes</h2>

            <section style={{ marginBottom: "1rem" }}>
                <label>Conductor: </label>
                <select
                    value={filtros.conductor}
                    onChange={(e) => setFiltros({ ...filtros, conductor: e.target.value })}
                >
                    <option value="">Todos</option>
                    {conductores.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.nombre} {c.apellido} ({c.dni})
                        </option>
                    ))}
                </select>

                <label style={{ marginLeft: "1rem" }}>Vehiculo: </label>
                <select
                    value={filtros.vehiculo}
                    onChange={(e) => setFiltros({ ...filtros, vehiculo: e.target.value })}
                >
                    <option value="">Todos</option>
                    {vehiculos.map((v) => (
                        <option key={v.id} value={v.id}>
                            {v.marca} {v.modelo} ({v.patente})
                        </option>
                    ))}
                </select>

                <button style={{ marginLeft: "1rem" }} onClick={fetchViajes}>
                    Filtrar
                </button>
            </section>

            {errores.length > 0 && (
                <div>
                    {errores.map((errores, i) => (
                        <p key={i} style={{ color: "red" }}>{errores}</p>
                    ))}
                </div>
            )}

            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Conductor</th>
                        <th>Vehiculo</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Fecha salida</th>
                        <th>Fecha llegada</th>
                        <th>Kilometros</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {viajes.length > 0 ? (
                        viajes.map((v) => (
                            <tr key={v.id_viaje}>
                                <td>{v.id_viaje}</td>
                                <td>{v.nombre_conductor} {v.apellido_conductor}</td>
                                <td>{v.marca} {v.modelo} ({v.patente})</td>
                                <td>{v.origen}</td>
                                <td>{v.destino}</td>
                                <td>{new Date(v.fecha_salida).toLocaleDateString()}</td>
                                <td>{new Date(v.fecha_llegada).toLocaleDateString()}</td>
                                <td>{v.kilometros}</td>
                                <td><Link to={`/viajes/${v.id_viaje}`}>Ver</Link></td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="9">No se encontraron viajes</td></tr>
                    )}
                </tbody>
            </table>

            <Link role="button" to="/viajes/crear">Registrar nuevo viaje</Link>
        </article>
    );
};
