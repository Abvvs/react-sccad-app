import React from "react";
import ContactInfoCard from "../../components/Cards/ContactInfoCard";
import { MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1181.7662155960636!2d-76.88395555271656!3d0.0886303335453772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sec!4v1761664979203!5m2!1ses!2sec"
  const handleGetDirections = () => {
    window.open("https://maps.app.goo.gl/e6Scg7qY3uTQs6f6A", "_blank");
  };
  return (
    <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Columna izquierda - Información */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Encabezado */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#d45500] mb-4">
                Contáctanos
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nos encantaría saber de ti. Ya sea que tengas preguntas,
                necesites soporte o quieras conocer más sobre nuestros
                servicios, nuestro equipo está aquí para ayudarte.
              </p>
            </div>

            {/* Información de contacto */}
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Dirección */}
              <ContactInfoCard
                icon={MapPin}
                title="Nuestra Dirección"
                iconBgColor="bg-[#e8d5c4]"
              >
                <p className="text-sm">12 de Febrero entre Cofánes y Velasco Ibarra</p>
                <p className="text-sm">Lago Agrio</p>
                <p className="text-sm">Ecuador</p>
              </ContactInfoCard>

              {/* Información de contacto */}
              <ContactInfoCard
                icon={Phone}
                title="Información de Contacto"
                iconBgColor="bg-[#e8d5c4]"
              >
                <a
                  href="tel:+593980120958"
                  className="text-sm hover:text-[#d45500] transition-colors block"
                >
                  +593 980 120 958
                </a>
                <a
                  href="mailto:topografiasccad@gmail.com"
                  className="text-sm hover:text-[#d45500] transition-colors block break-all"
                >
                  topografiasccad@gmail.com
                </a>
              </ContactInfoCard>
            </div>

            {/* Horarios */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Horario de Atención
              </h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lunes - Viernes</span>
                  <span className="text-sm font-semibold">
                    8:00 AM - 5:30 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sábado - Domingo</span>
                  <span className="text-sm font-semibold text-gray-400">
                    Cerrado
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Mapa */}
          <div className="relative">
            <div className="sticky top-24">
              {/* Contenedor del mapa */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] lg:h-[600px]">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen= {true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />

                {/* Botón de obtener direcciones */}
                <button
                  onClick={handleGetDirections}
                  className="absolute bottom-6 left-6 bg-[#8b7355] hover:bg-[#5c4a3a] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Ver Dirección
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
