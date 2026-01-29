//import React from 'react'
//import { Outlet } from 'react-router-dom'

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ScrollToHash } from "../components/ScrollToHash";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToHash/>
      <Navbar />
      <main className="flex-1">
        <Outlet /> {/* Aquí se renderizan las páginas */}
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
