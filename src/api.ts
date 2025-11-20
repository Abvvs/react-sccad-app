import axios from "axios"; 
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

/* es un interceptor o intermediario entre en back y el front */

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si recibimos 401, intentamos refrescar el token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem(REFRESH_TOKEN);

      if (!refresh) {
        // No hay refresh → cerrar sesión
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Pedimos nuevo access token
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/token/refresh/`, {
          refresh,
        });

        const newAccess = res.data.access;
        localStorage.setItem(ACCESS_TOKEN, newAccess);

        // Actualizamos headers globales
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;

        // Reintentamos el request original con el nuevo token
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return api(originalRequest);

      } catch (err) {
        // Refresh ya expiró → sesión caducada
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
export default api