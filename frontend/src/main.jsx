import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@picocss/pico";
import './index.css'
import { Layout } from "./Layout.jsx";
import { Principal } from "./paginas/Principal"
import { AuthProvider, AuthPage } from "./Auth";
import { BrowserRouter, Route, Routes } from "react-router";
import { Conductores } from "./paginas/conductores/Conductores.jsx"
import { CrearConductor } from "./paginas/conductores/Crearconductor.jsx"
import { DetallesConductor } from "./paginas/conductores/Detalleconductor.jsx"
import { ModificarConductor } from "./paginas/conductores/Modificarconductor.jsx"
import { Vehiculos } from "./paginas/vehiculos/Vehiculos.jsx"
import { CrearVehiculo } from "./paginas/vehiculos/Crearvehiculo.jsx"
import { DetallesVehiculo } from "./paginas/vehiculos/Detallevehiculos.jsx"
import { ModificarVehiculo } from "./paginas/vehiculos/Modificarvehiculo.jsx"
import { Viajes } from "./paginas/viajes/Viajes.jsx";
import { CrearViaje } from "./paginas/viajes/Crearviaje.jsx";
import { DetallesViaje } from "./paginas/viajes/Detalleviaje.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Principal />} />
            <Route
              path="vehiculos"
              element={
                <AuthPage>
                  <Vehiculos />
                </AuthPage>}
            />
            <Route
              path="vehiculos/crear"
              element={
                <AuthPage>
                  <CrearVehiculo />
                </AuthPage>
              }
            />
            <Route
              path="vehiculos/:id"
              element={
                <AuthPage>
                  <DetallesVehiculo />
                </AuthPage>
              }
            />
            <Route
              path="vehiculos/:id/modificar"
              element={
                <AuthPage>
                  <ModificarVehiculo />
                </AuthPage>
              }
            />
            <Route
              path="conductores"
              element={
                <AuthPage>
                  <Conductores />
                </AuthPage>}
            />
            <Route
              path="conductores/crear"
              element={
                <AuthPage>
                  <CrearConductor />
                </AuthPage>
              }
            />
            <Route
              path="conductores/:id"
              element={
                <AuthPage>
                  <DetallesConductor />
                </AuthPage>
              }
            />
            <Route
              path="conductores/:id/modificar"
              element={
                <AuthPage>
                  <ModificarConductor />
                </AuthPage>
              }
            />
            <Route
              path="/viajes"
              element={
                <AuthPage>
                  <Viajes />
                </AuthPage>
                }
            />
            <Route
              path="/viajes/crear"
              element={
                <AuthPage>
                  <CrearViaje />
                </AuthPage>
                }
            />
            <Route
              path="/viajes/:id"
              element={
                <AuthPage>
                  <DetallesViaje />
                </AuthPage>
                }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
