const AboutUsSection = () => {
  return (
    <section
      className="bg-background-light dark:bg-background-dark/50 py-16 sm:py-24"
      aria-labelledby="about-title"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#d45500]">
            Sobre SCCAD
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            En <strong>SCCAD</strong> somos una empresa especializada en
            <strong>
              {" "}
              topografía, medición de terrenos, diseño de vías y arquitectura
            </strong>
            en <strong>Lago Agrio y la región amazónica</strong>. Contamos con
            un equipo de profesionales con amplia experiencia en el sector, que
            utiliza tecnología de vanguardia para garantizar precisión, calidad
            y cumplimiento normativo en cada proyecto. Nuestro compromiso es
            ofrecer soluciones técnicas confiables y personalizadas, adaptadas a
            las necesidades de cada cliente.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
