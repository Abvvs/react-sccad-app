const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-sm">© 2024 SCCAD. Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6">
            <a className="text-sm hover:text-primary transition-colors" href="#">
              Política de Privacidad
            </a>
            <a className="text-sm hover:text-primary transition-colors" href="#">
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
