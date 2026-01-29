import React from 'react'
import SimpleCard from '../../components/Cards/SimpleCard';
import topografiaImage from "/mapa-topografia.webp";
import viasImage from "../../assets/topografia_vias.webp";
import arquitecturaImage from "../../assets/arquitectura.webp";
import legalizacionImage from "../../assets/node_topografia_anivellament_3.webp";

const services = [
  {
    title: "Topografía y Medición de Terrenos",
    description:
      "Levantamientos precisos para proyectos de construcción, desarrollo urbano y rural.",
    imageUrl: topografiaImage,
  },
  {
    title: "Diseño de Vías y Caminos",
    description:
      "Diseño de carreteras, caminos y vías urbanas con enfoque en seguridad y eficiencia.",
    imageUrl: viasImage,
  },
  {
    title: "Arquitectura y Diseño",
    description:
      "Diseño arquitectónico innovador y funcional para viviendas, edificios comerciales e industriales.",
    imageUrl: arquitecturaImage,
  },
  {
    title: "Legalización de Terrenos y Propiedades",
    description:
      "Asesoría y gestión de trámites para la legalización de terrenos y propiedades.",
    imageUrl: legalizacionImage,
  },
];

const ServiceSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#d45500]">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Soluciones expertas para cada necesidad.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <SimpleCard
              key={service.title}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServiceSection