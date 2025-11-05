"use client"

import { motion, useScroll, useTransform } from "motion/react"
import CarouselCard from "../Cards/CarouselCard";
import { useRef } from "react";
import img1 from '../../assets/HomeGallery/CAMPO.jpeg'
import img2 from '../../assets/HomeGallery/ESTACION TOTAL 1.jpeg'
import img3 from '../../assets/HomeGallery/LEVANTAMIENTO_2.jpeg'
import img4 from '../../assets/HomeGallery/LEVANTAMIENTO.jpeg'
import img5 from '../../assets/HomeGallery/RTK REPLANTEO.jpeg'
import img6 from '../../assets/HomeGallery/RTK.jpeg'
import img7 from '../../assets/HomeGallery/CADENERO.jpeg'

const cards = [
  {
    url: img1,
    title: "S",
    id: 1,
  },
  {
    url: img2,
    title: "C",
    id: 2,
  },
  {
    url: img3,
    title: "C",
    id: 3,
  },
  {
    url: img4,
    title: "A",
    id: 4,
  },
  {
    url: img5,
    title: "D",
    id: 5,
  },
  {
    url: img6,
    title: "TOPO",
    id: 6,
  },
  {
    url: img7,
    title: "GRAFÍA",
    id: 7,
  },
]

const HeroCarouselScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#d4b896]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <CarouselCard id={card.id} url={card.url} title={card.title} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCarouselScroll;