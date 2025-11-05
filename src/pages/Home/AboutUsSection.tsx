import React from "react";

const AboutUsSection = () => {
  return (
    <section className="bg-background-light dark:bg-background-dark/50 py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#d45500]">
            Sobre Nosotros
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            En SCCAD, nos dedicamos a proporcionar soluciones integrales en
            topografía y diseño. Con años de experiencia en el sector, nuestro
            equipo de profesionales altamente calificados utiliza tecnología de
            vanguardia para garantizar la precisión y calidad en cada proyecto.
            Nos comprometemos con la satisfacción de nuestros clientes,
            ofreciendo servicios personalizados y adaptados a sus necesidades
            específicas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
