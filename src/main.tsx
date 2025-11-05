import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home/Home.tsx';
import VentanillaVirtual from './pages/VentanillaVirtual/VentanillaVirtual.tsx';
import './index.css'
import App from './App.tsx'
import RootLayout from './layout/RootLayout.tsx';

const router = createBrowserRouter([
  {
    path: "/",                // ruta raíz
    element: <RootLayout />,  // layout principal con Navbar y Footer
    children: [
      { path: "/", element: <Home /> },
      { path: "/ventanilla", element: <VentanillaVirtual /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <RouterProvider router={router} /> */}
  </StrictMode>,
)
