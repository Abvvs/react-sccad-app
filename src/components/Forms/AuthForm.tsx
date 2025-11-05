import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import logo from "../../assets/sccad.svg";
import { jwtDecode } from "jwt-decode";
/* import LoadingIndicator from "./LoadingIndicator"; */
/* import "../styles/Form.css"; */

// Tipos para las props del componente
interface AuthFormProps {
  route: string;
  method: "login" | "register";
}

// Tipo para la respuesta de login
interface LoginResponse {
  access: string;
  refresh: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ route, method }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const isLogin = method === "login";
  const name = isLogin ? "Bienvenido de Nuevo" : "Crear Cuenta";
  const subtitle = isLogin
    ? "Inicia sesión en tu cuenta de SCCAD"
    : "Regístrate en SCCAD";
  const buttonText = isLogin ? "Iniciar Sesión" : "Registrarse";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post<LoginResponse>(route, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        const decoded: any = jwtDecode(res.data.access);
        localStorage.setItem("username", decoded.username);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ha ocurrido un error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src={logo}
          alt="SCCAD TOPOGRAFIA"
          className="mx-auto h-30 w-auto"
        />
        <div className="flex w-full flex-col gap-2">
          <p className="text-[#d45500] tracking-light text-[32px] font-bold leading-tight">
            {name}
          </p>
          <p className="text-[#ff7a33] text-base font-normal leading-normal">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex w-full flex-col gap-4">
            <input
              className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuario"
              required
              autoComplete="usuario"
            />
            <div className="mt-2">
              <input
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                autoComplete={
                  method === "login" ? "current-password" : "new-password"
                }
              />
            </div>
          </div>
          {/* {loading && <LoadingIndicator />} */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-[#5c4a3a] px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-[#8b7355] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
