"use client";

import { motion, useScroll, useTransform } from "motion/react";
import CarouselCard from "../Cards/CarouselCard";
import { useRef } from "react";
import img1 from "../../assets/HomeGallery/CAMPO.webp";
import img2 from "../../assets/HomeGallery/ESTACION TOTAL 1.webp";
import img3 from "../../assets/HomeGallery/LEVANTAMIENTO_2.webp";
import img4 from "../../assets/HomeGallery/LEVANTAMIENTO.webp";
import img5 from "../../assets/HomeGallery/RTK REPLANTEO.webp";
import img6 from "../../assets/HomeGallery/RTK.webp";
import img7 from "../../assets/HomeGallery/CADENERO.webp";

const cards = [
  {
    url: img1,
    alt: "Trabajo de topografía en campo en Lago Agrio",
    overlayText: "S",
  },
  {
    url: img2,
    alt: "Medición topográfica con estación total",
    overlayText: "C",
  },
  {
    url: img3,
    alt: "Levantamiento topográfico profesional",
    overlayText: "C",
  },
  {
    url: img4,
    alt: "Levantamiento de terrenos para proyectos",
    overlayText: "A",
  },
  {
    url: img5,
    alt: "Replanteo topográfico con tecnología RTK",
    overlayText: "D",
  },
  {
    url: img6,
    alt: "Medición con GPS RTK de alta precisión",
    overlayText: "TOPO",
  },
  {
    url: img7,
    alt: "Trabajo de campo topográfico profesional",
    overlayText: "GRAFÍA",
  },
];

const HeroCarouselScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] bg-[#d4b896]"
      aria-labelledby="gallery-title"
    >
      <h2 id="gallery-title" className="sr-only">
        Galería de trabajos de topografía, medición y levantamientos en campo
      </h2>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.ul style={{ x }} className="flex gap-4">
          {cards.map((card, index) => {
            return (
              <CarouselCard
                key={index}
                url={card.url}
                alt={card.alt}
                overlayText={card.overlayText}
              />
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default HeroCarouselScroll;
