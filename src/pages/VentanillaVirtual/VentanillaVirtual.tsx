import React from "react";
import VentanillaHeader from "./VentanillaHeader";
import SearchForm from "./SearchForm";
const VentanillaVirtual = () => {
  return (
    <>
      <div className="mx-auto max-w-2xl text-center mb-12">
        <VentanillaHeader />
      </div>
      <div className="mx-auto max-w-xl">
        <SearchForm />
      </div>
    </>
  );
};

export default VentanillaVirtual;
