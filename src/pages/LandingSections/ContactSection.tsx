import ContactInfoCard from "../../components/Cards/ContactInfoCard";
import { MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1181.7662155960636!2d-76.88395555271656!3d0.0886303335453772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sec!4v1761664979203!5m2!1ses!2sec";
  const handleGetDirections = () => {
    window.open("https://maps.app.goo.gl/e6Scg7qY3uTQs6f6A", "_blank");
  };
  return (
    <section
      id="contacto"
      className="py-20 bg-background relative overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Columna izquierda - Información */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Encabezado */}
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-primary mb-4"
                id="contact-title"
              >
                Contacto SC CAD
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Ofrecemos servicios profesionales en{" "}
                <strong className="text-foreground">
                  levantamientos topográficos, subdivisiones, replanteos y
                  georreferenciación
                </strong>
                . Estamos listos para asesorarte en tu próximo proyecto.
              </p>
            </div>

            {/* Información de contacto */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Dirección */}
              <ContactInfoCard
                icon={MapPin}
                title="Nuestra Dirección"
                iconBgColor="bg-accent"
              >
                <address className="not-italic text-sm leading-relaxed text-muted-foreground">
                  12 de Febrero entre Cofánes y Velasco Ibarra
                  <br />
                  Lago Agrio, Ecuador
                </address>
              </ContactInfoCard>

              {/* Información de contacto */}
              <ContactInfoCard
                icon={Phone}
                title="Información de Contacto"
                iconBgColor="bg-accent"
              >
                <a
                  href="tel:+593980120958"
                  aria-label="Llamar a SCCAD"
                  className="text-sm hover:text-primary transition-colors block"
                >
                  +593 980 120 958
                </a>
                <a
                  href="mailto:topografiasccad@gmail.com"
                  aria-label="Enviar correo a SCCAD"
                  className="text-sm hover:text-primary transition-colors block break-all"
                >
                  topografiasccad@gmail.com
                </a>
              </ContactInfoCard>
            </div>

            {/* Horarios */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-medium text-foreground">
                  Horario de Atención
                </h3>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Lunes – Viernes</span>
                  <span className="font-medium text-foreground">
                    8:00 AM – 5:30 PM
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Sábado – Domingo</span>
                  <span className="text-muted">Cerrado</span>
                </div>
              </div>
            </div>
          </div>
          {/* Columna derecha - Mapa */}
          <div className="relative">
            <div className="sticky top-24">
              {/* Contenedor del mapa */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-border h-[500px] lg:h-[600px] bg-card">
                <iframe
                  title="Ubicación oficina SC CAD en Lago Agrio"
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
                {/* Botón de obtener direcciones */}
                <button
                  onClick={handleGetDirections}
                  aria-label="Abrir ubicación de SCCAD en Google Maps"
                  className="absolute bottom-6 left-6 bg-secondary text-secondary-foreground hover:bg-forest-dark px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Cómo llegar
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
