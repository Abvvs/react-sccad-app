import { useState } from "react";
import { ZoomIn } from "lucide-react";
import GalleryLightbox from "./GalleryLightbox";
import cadenero from "@/assets/HomeGallery/CADENERO.jpeg"
import estacion_total from "@/assets/HomeGallery/ESTACION TOTAL 1.jpeg"
import estacion_total_2 from "@/assets/HomeGallery/LEVANTAMIENTO_2.jpeg"
import tecnologia from "@/assets/HomeGallery/GNSS RTK.jpeg"
import planificacion_dron from "@/assets/HomeGallery/DRON_PLANIFICACION.jpeg"
import planificacion_construccion from "@/assets/HomeGallery/CONSTRUCCION.jpeg"

interface GalleryImage {
  url: string;
  alt: string;
  category: string;
  title: string;
}

const galleryImages: GalleryImage[] = [
  {
    url: cadenero,
    alt: "Cadenero realizando levantamiento topográfico en campo rural",
    category: "Levantamientos",
    title: "Levantamiento Topográfico en Campo",
  },
  {
    url: estacion_total,
    alt: "Estación total utilizada para medición de coordenadas en proyecto urbano",
    category: "Tecnología",
    title: "Medición con Estación Total",
  },
  {
    url: estacion_total_2,
    alt: "Topógrafo operando estación total para levantamiento planimétrico",
    category: "Levantamientos",
    title: "Levantamiento Planimétrico",
  },
  {
    url: tecnologia,
    alt: "Equipo tecnológico de topografía para replanteo y georreferenciación",
    category: "Tecnología",
    title: "Tecnología de Precisión",
  },
  {
    url: planificacion_dron,
    alt: "Planificación de levantamiento aéreo con dron para mapeo topográfico",
    category: "Planificación",
    title: "Planificación con Dron",
  },
  {
    url: planificacion_construccion,
    alt: "Análisis y planificación técnica para proyecto de construcción",
    category: "Planificación",
    title: "Planificación de Proyecto",
  },
];

const categories = [
  "Todos",
  "Levantamientos",
  "Tecnología",
  "Planificación",
];

const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    selectedCategory === "Todos"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section
      id="galeria"
      className="py-20 bg-background-light dark:bg-background-dark/50"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Nuestro Trabajo en Campo
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            Ejecutamos levantamientos planimétricos, altimétricos y georreferenciación
  con tecnología de precisión para proyectos urbanos, rurales y obras civiles.
          </p>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-2 rounded-full border transition-all duration-300 text-sm ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, id) => (
            <div
              key={id}
              onClick={() => setSelectedImage(image)}
              className="group relative cursor-pointer overflow-hidden rounded-xl
                 bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={image.url}
                alt={image.alt}
                loading="lazy"
                className="w-full h-64 object-cover transition-transform duration-500
                   group-hover:scale-110"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center
                   bg-primary/90 backdrop-blur-sm opacity-0 group-hover:opacity-100
                   transition-opacity duration-300 p-6"
              >
                <ZoomIn className="w-12 h-12 text-white mb-3" />
                <h3 className="text-xl text-white text-center mb-2">
                  {image.title}
                </h3>
                <span className="text-sm px-4 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm">
                  {image.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <p className="text-center mt-12 text-gray-500">
            No hay imágenes en esta categoría.
          </p>
        )}
      </div>

      {/* Lightbox */}
      <GalleryLightbox
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
};

export default GallerySection;
