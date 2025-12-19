import HeroCarousel from "../../components/Heros/HeroCarousel";
import arquitecturaImage from "../../assets/arquitectura.webp";
import topografiaImage from "/mapa-topografia.webp";
import topografiaViasImage from "../../assets/topografia_vias.webp";
import topografiaTierrasImage from "../../assets/node_topografia_anivellament_3.webp";

const slides = [
  {
    title: "Soluciones Integrales en Topografía y Diseño",
    description:
      "SCCAD es una empresa líder en topografía, medición de tierras, diseño de vías, arquitectura y legalización.",
    imageUrl: topografiaImage,
  },
  {
    title: "Topografía Profesional y Medición de Tierras Lago Agrio",
    description:
      "Levantamientos topográficos precisos y detallados para todo tipo de proyectos.",
    imageUrl: topografiaTierrasImage,
  },
  {
    title: "Diseño de Vías y Caminos Rurales",
    description:
      "Diseño de carreteras y vías urbanas con enfoque en seguridad y eficiencia.",
    imageUrl: topografiaViasImage,
  },
  {
    title: "Arquitectura y Diseño en Lago Agrio",
    description:
      "Creamos espacios funcionales y estéticos para viviendas y comercios.",
    imageUrl: arquitecturaImage,
  },
];

const HeroSection = () => {
  return (
    <>
      <HeroCarousel slides={slides} />
    </>
  );
};

export default HeroSection;
