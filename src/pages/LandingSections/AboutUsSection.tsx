import { CheckCircle } from "lucide-react";
import aboutImage from "@/assets/LEVANTAMIENTO_2.webp"

const highlights = [
  "Más de 25 años de experiencia en topografía",
  "Profesionales certificados y habilitados",
  "Tecnología moderna y equipos de alta precisión",
  "Cumplimiento normativo y respaldo técnico",
  "Atención personalizada en cada proyecto",
  "Cobertura en Lago Agrio y la región amazónica",
];

const AboutUsSection = () => {
  return (
    <section
      id="nosotros"
      aria-labelledby="about-title"
      className="bg-background-light dark:bg-background-dark/50 py-16 sm:py-24"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* TEXTO */}
          <div>
            <h2
              id="about-title"
              className="text-3xl md:text-4xl font-bold text-primary"
            >
              Sobre SCCAD
            </h2>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              En <strong>SCCAD</strong> somos una empresa especializada en{" "}
              <strong>
                topografía, medición de terrenos, diseño de vías y arquitectura
              </strong>{" "}
              en <strong>Lago Agrio y la región amazónica</strong>.
            </p>

            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Nuestro equipo combina experiencia técnica y tecnología moderna
              para garantizar precisión, cumplimiento normativo y soluciones
              confiables adaptadas a cada proyecto.
            </p>

            {/* HIGHLIGHTS */}
            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span className="text-sm md:text-base text-foreground/80">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* VISUAL / PLACEHOLDER */}
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-muted shadow-lg flex items-center justify-center text-muted-foreground">
              {/* Placeholder temporal — aquí va galería / equipo */}
              <img
                src={aboutImage}
                alt="Equipo de topografía SCCAD en trabajo de campo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
