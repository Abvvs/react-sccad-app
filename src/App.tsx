import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import AuthLayout from "./layout/AuthLayout";
import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import HomeDashboard from "./pages/Dashboard/HomeDashboard";
import NotFoundLandingPage from "./pages/NotFoundLandingPage";
import VentanillaVirtual from "./pages/VentanillaVirtual/VentanillaVirtual";
import Trabajos from "./pages/Trabajos/Trabajos";
import Empleados from "./pages/Dashboard/Empleados";
import Clientes from "./pages/Dashboard/Clientes";
import MovimientosCaja from "./pages/MovimientosCaja/MovimientosCaja";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 LANDING PAGE */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ventanilla" element={<VentanillaVirtual />} />
        </Route>
        {/* 🔐 AUTH PAGES */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterAndLogout />} />
        </Route>
        {/* 🧭 ADMIN / DASHBOARD (PROTEGIDO) */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<HomeDashboard />} />
          <Route path="/trabajos" element={<Trabajos />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/movimiento_caja" element={<MovimientosCaja />} />

        </Route>
        {/* 🚫 404 */}
        <Route element={<RootLayout />}>
          <Route path="*" element={<NotFoundLandingPage />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
