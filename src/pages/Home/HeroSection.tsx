import React from 'react'
import HeroCarousel from '../../components/Heros/HeroCarousel';
import arquitecturaImage from '../../assets/arquitectura.jpeg'
import topografiaImage from '../../assets/mapa-topografia.jpeg'
import topografiaViasImage from '../../assets/topografia_vias.jpg'
import topografiaTierrasImage from '../../assets/node_topografia_anivellament_3.jpg'

const slides = [
  {
    title: "Soluciones Integrales en Topografía y Diseño",
    description:
      "SCCAD es una empresa líder en topografía, medición de tierras, diseño de vías, arquitectura y legalización.",
    imageUrl: topografiaImage
  },
  {
    title: "Topografía y Medición de Tierras",
    description:
      "Levantamientos topográficos precisos y detallados para todo tipo de proyectos.",
    imageUrl: topografiaTierrasImage
  },
  {
    title: "Diseño de Vías Moderno y Eficiente",
    description: "Diseño de carreteras y vías urbanas con enfoque en seguridad y eficiencia.",
    imageUrl: topografiaViasImage
  },
  {
    title: "Arquitectura y Diseño Innovador",
    description: "Creamos espacios funcionales y estéticos para viviendas y comercios.",
    imageUrl:
      arquitecturaImage,
  },
];

const HeroSection = () => {
  return (
    <>
    <HeroCarousel slides={slides} />
    </>
  )
}

export default HeroSection