import React from "react";
import { Building2, FileText, MapPin, Ruler } from "lucide-react";

const services = [
  {
    icon: Ruler,
    title: "Topografía y Medición de Terrenos",
    description:
      "Levantamientos precisos para proyectos de construcción, desarrollo urbano y rural.",
  },
  {
    icon: MapPin,
    title: "Diseño de Vías y Caminos",
    description:
      "Diseño de carreteras, caminos y vías urbanas con enfoque en seguridad y eficiencia.",
  },
  {
    icon: Building2,
    title: "Arquitectura y Diseño",
    description:
      "Diseño arquitectónico innovador y funcional para viviendas, edificios comerciales e industriales.",
  },
  {
    icon: FileText,
    title: "Legalización de Terrenos y Propiedades",
    description:
      "Asesoría y gestión de trámites para la legalización de terrenos y propiedades.",
  },
];

const ServiceSection: React.FC = () => {
  return (
    <section
      id="servicios"
      className="py-20 bg-muted/40"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Soluciones técnicas integrales en topografía, diseño y legalización
            de terrenos.
          </p>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <li
                key={service.title}
                className="group bg-background rounded-xl border border-border p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ServiceSection;
