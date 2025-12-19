import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

interface Slide {
  title: string;
  description: string;
  imageUrl: string;
}

interface HeroProps {
  slides: Slide[];
  whatsappNumber?: string;
  whatsappMessage?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number; // en ms
}

const HeroCarousel = ({
  slides,
  whatsappNumber = "593980120958",
  whatsappMessage = "¡Hola! Me gustaria obtener más información.",
  autoPlay = true,
  autoPlayInterval = 5000,
}: HeroProps) => {
  const [current, setCurrent] = useState(0);
  const currentSlide = slides[current];
  // Cambio automático de slides
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoPlay, autoPlayInterval]);
  // Función para abrir WhatsApp
  const handleWhatsAppClick = () => {
    const cleanPhone = whatsappNumber.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden text-white"
      id="hero"
    >
      <img
        src={currentSlide.imageUrl}
        alt={`Topografía y arquitectura en Lago Agrio - ${currentSlide.title}`}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        loading="eager"
        width={1920}
        height={1080}
      />
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-20 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
          {currentSlide.title}
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 font-light">
          {currentSlide.description}
        </p>
        <button
          onClick={handleWhatsAppClick}
          className="inline-flex items-center gap-3 bg-[#d45500] text-white text-base md:text-lg font-bold py-4 px-8 rounded-lg hover:bg-[#b84600] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
          Contáctanos por WhatsApp
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`h-2 w-2 rounded-full transition-colors ${
              idx === current ? "bg-white" : "bg-white/50 hover:bg-white"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
