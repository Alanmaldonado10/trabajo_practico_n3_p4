import express from "express";
import cors from "cors";
import { conectarDB } from "./db.js";
import authConfig from "./validaciones/auth.js";
import usuariosRoutes from "./rutas/usuarios.js";
import conductoresRoutes from "./rutas/conductores.js";
import vehiculosRoutes from "./rutas/vehiculos.js"
import viajesRoutes from "./rutas/viajes.js";
import { verificarAutenticacion } from "./validaciones/auth.js";
conectarDB();

const app = express();
const port = 3000;

// Para interpretar body como JSON
app.use(express.json());

// Habilito CORS
app.use(cors());
authConfig();

app.get("/", (req, res) => {
  // Responder con string
  res.send("Hola mundo!");
});

app.use("/usuarios", usuariosRoutes)

app.use(verificarAutenticacion)

app.use("/conductores", conductoresRoutes)
app.use("/vehiculos", vehiculosRoutes)
app.use("/viajes", viajesRoutes)

app.listen(port, () => {
  console.log(`La aplicación esta funcionando en el puerto ${port}`);
});
