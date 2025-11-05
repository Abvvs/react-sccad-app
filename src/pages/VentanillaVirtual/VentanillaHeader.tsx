import React from "react";

const VentanillaHeader = () => {
  return (
    <>
      <h1 className="text-4xl font-extrabold tracking-tighter text-[#d45500] sm:text-5xl">
        Ventanilla Virtual
      </h1>
      <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
        Rastree el estado de su trámite en tiempo real. Ingrese su número de
        trabajo para ver el historial de fases.
      </p>
    </>
  );
};

export default VentanillaHeader;
