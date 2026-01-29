/* import HeroCarousel from "../../components/Heros/HeroCarousel";
import arquitecturaImage from "../../assets/arquitectura.webp";
import topografiaImage from "/mapa-topografia.webp";
import topografiaViasImage from "../../assets/topografia_vias.webp"; */
import topografiaTierrasImage from "../../assets/node_topografia_anivellament_3.webp";
import { Button } from "../../components/Buttons/Button";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToServices = () => {
    document
      .getElementById("servicios")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center pt-16"
    >
      {/* Background image */}
      <img
        src={topografiaTierrasImage}
        alt="Topografía, arquitectura y diseño en Lago Agrio"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" />
      {/* contenido */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
              Topografía y Diseño Profesional
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Soluciones integrales en topografía, medición de tierras, diseño de
              vías y arquitectura, con precisión técnica y respaldo legal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="cta"
                size="lg"
                icon="whatsapp"
                onClick={scrollToContact}
              >
                Contáctanos
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={scrollToServices}
                className="text-white border-white hover:bg-white/10"
              >
                Ver servicios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
