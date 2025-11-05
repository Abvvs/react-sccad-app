import React from 'react'
import SimpleCard from '../../components/Cards/SimpleCard';

import topografiaImage from "../../assets/mapa-topografia.jpeg";
import viasImage from "../../assets/topografia_vias.jpg";
import arquitecturaImage from "../../assets/arquitectura.jpeg";
import legalizacionImage from "../../assets/node_topografia_anivellament_3.jpg";

const services = [
  {
    title: "Topografía y Medición",
    description:
      "Levantamientos precisos para proyectos de construcción, desarrollo urbano y rural.",
    imageUrl: topografiaImage,
  },
  {
    title: "Diseño de Vías",
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
    title: "Legalización de Terrenos",
    description:
      "Asesoría y gestión de trámites para la legalización de terrenos y propiedades.",
    imageUrl: legalizacionImage,
  },
];

const ServiceSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#d45500]">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Soluciones expertas para cada necesidad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <SimpleCard
              key={service.title}
              title={service.title}
              description={service.description}
              imageUrl={service.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection