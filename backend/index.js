import express from "express";
import cors from "cors";
import { conectarDB } from "./db.js";
import authConfig from "./auth.js";
import usuariosRoutes from "./rutas/usuarios.js";
import conductoresRoutes from "./rutas/conductores.js";

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
app.use("/conductores", conductoresRoutes)

app.listen(port, () => {
  console.log(`La aplicación esta funcionando en el puerto ${port}`);
});
