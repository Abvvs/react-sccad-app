import SimpleCard from "../../components/Cards/SimpleCard";
const projects = [
  {
    title: "Complejo Comercial Riverside",
    description:
      "Levantamiento topográfico y replanteo para desarrollo comercial de gran escala.",
    category: "Comercial",
    imageUrl:
      "https://images.unsplash.com/photo-1628155933410-8f2a84bb8076?q=80&w=1080",
  },
  {
    title: "Proyecto Vial Amazónico",
    description:
      "Diseño geométrico y control topográfico para ampliación de carretera.",
    category: "Infraestructura",
    imageUrl:
      "https://images.unsplash.com/photo-1638207849658-e57be0cdc208?q=80&w=1080",
  },
  {
    title: "Urbanización Residencial",
    description:
      "Subdivisión predial y levantamiento topográfico para proyecto habitacional.",
    category: "Residencial",
    imageUrl:
      "https://images.unsplash.com/photo-1545254000-6c843440c5cd?q=80&w=1080",
  },
  {
    title: "Parque Industrial",
    description:
      "Levantamientos ALTA/NSPS y control técnico para expansión industrial.",
    category: "Industrial",
    imageUrl:
      "https://images.unsplash.com/photo-1769184614284-a1ebf0570825?q=80&w=1080",
  },
];

const ProjectSection = () => {
  return (
    <section
      id="proyectos"
      className="relative py-16 sm:py-24 bg-background-light dark:bg-background-dark"
    >
      {/* Conector visual */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-border" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Proyectos Destacados
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Algunos de los trabajos que reflejan nuestra experiencia y precisión
            técnica en topografía, diseño y planificación.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <SimpleCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
