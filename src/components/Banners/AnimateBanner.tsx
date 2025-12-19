import {
  Satellite,
  Radio,
  Layers,
  Compass,
  Wifi,
  Zap,
  Award,
  Navigation,
  Drone,
} from "lucide-react";
import BannerItem from "./BannerItem";

const AnimateBanner = () => {
  const technologies = [
    { icon: Award, title: "+34 Años", subtitle: "de Experiencia" },
    { icon: Satellite, title: "Trimble", subtitle: "Tecnología de precisión" },
    { icon: Wifi, title: "Starlink", subtitle: "Conectividad satelital" },
    { icon: Radio, title: "RTK", subtitle: "Real Time Kinematic" },
    { icon: Compass, title: "Estación Total", subtitle: "Mediciones exactas" },
    { icon: Layers, title: "NTRIP", subtitle: "Correcciones en tiempo real" },
    { icon: Drone, title: "Drones", subtitle: "Topografía aérea" },
    { icon: Zap, title: "Tecnología Láser", subtitle: "Escaneo 3D" },
    { icon: Navigation, title: "GPS/GNSS", subtitle: "Posicionamiento global" },
  ];
  const duplicatedTechs = [...technologies, ...technologies, ...technologies];
  return (
    <section className="w-full bg-[#d45500] py-6 overflow-hidden relative">
      <h2 id="tech-banner-title" className="sr-only">
        Tecnología y experiencia en topografía y arquitectura
      </h2>
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#d45500] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#d45500] to-transparent z-10 pointer-events-none" />
      <ul className="flex animate-scroll-continuous">
        {duplicatedTechs.map((tech, index) => (
          <BannerItem
            key={index}
            icon={tech.icon}
            title={tech.title}
            subtitle={tech.subtitle}
          />
        ))}
      </ul>
      <style>{`
        @keyframes scroll-continuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-scroll-continuous {
          animation: scroll-continuous 45s linear infinite;
          display: flex;
          width: fit-content;
        }

        .animate-scroll-continuous:hover {
          animation-play-state: paused;
        }

        /* Responsive: ajustar velocidad en móviles */
        @media (max-width: 768px) {
          .animate-scroll-continuous {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
};

export default AnimateBanner;
