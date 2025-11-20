import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

// Menu dinámico
const menuItems = [
  { label: "Inicio", path: "/dashboard" },
  { label: "Trabajos", path: "/trabajos" },
  { label: "Empleados", path: "/empleados" },
  { label: "Clientes", path: "/clientes" },
];
function getUserName() {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.username;
  } catch {
    return "Usuario";
  }
}
interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onLogout = () => (window.location.href = "/logout"),
}) => {
  const userName = getUserName();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const toggle = () => setOpen(!open);

  return (
    <>
      {/* Botón hamburguesa (solo móvil) */}
      <button
        onClick={toggle}
        className="md:hidden p-2 fixed top-3 left-3 z-50 bg-white rounded-md shadow text-[#5c4a3a]"
      >
        <Menu size={22} />
      </button>

      {/* Overlay para móvil */}
      {open && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50
          bg-[#f5f5f0] border-r border-[#e0ddd5] shadow-lg
          p-5 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-lg font-bold text-[#5c4a3a]">{userName}</h2>
          </div>

          <button onClick={toggle} className="md:hidden text-[#5c4a3a]">
            <X size={20} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="space-y-1">
          {menuItems.map(({ label, path }) => {
            const active = pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`
                  block px-3 py-2 rounded-lg transition
                  ${
                    active
                      ? "bg-[#e8d5c4] font-medium text-[#5c4a3a]"
                      : "text-[#5c4a3a] hover:bg-[#e8d5c4]"
                  }
                `}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="mt-10 flex items-center gap-2 text-[#d45500] hover:text-[#a34400] transition font-medium"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
