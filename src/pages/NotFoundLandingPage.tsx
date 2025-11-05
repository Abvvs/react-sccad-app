import React from "react";

interface NotFoundLandingPageProps {}

const NotFoundLandingPage: React.FC<NotFoundLandingPageProps> = () => {
  const handleGoHome = (): void => {
    // Implementa la navegación a la página principal
    // Por ejemplo: router.push('/') o window.location.href = '/'
    console.log("Navegar a página principal");
  };

  const backgroundImageUrl: string =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD2euF_rfT-clBtuPLYYvIgg8vMgybrOUQZ5wyo8lUhJVvwt_2SqUY-eT4oYykfmg3MZsQYhQQ7CsNpBr_9NwW5F4c5kTVAjnBhNUsCt1jUjZWQGk9TVZMInBQkbLc4I7pLvhUIKStVBg0X0FO22bv_Ig5maCmnn5KoGdVi0hM8Y1eJ9ojWeeO8t3xUDTYpDwVdkOMFfG0NUzKkspVVqAel2YWc8x4XNuteMNNxbS6cQ6dFmxFBe7fUL4dVjo--tvDqFwR8-wlaXWBf";

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[#d45500] text-base font-bold leading-tight">
          Error 404
        </h1>
        <p className="text-[#d45500] text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] max-w-lg">
          Página No Encontrada
        </p>
        <p className="text-gray-600 text-base font-normal leading-normal max-w-md pt-2">
          ¡Ups! Parece que esta coordenada no existe en nuestro mapa. La página
          que buscas podría haber sido movida o eliminada.
        </p>
      </div>
      <div
        className="bg-center bg-no-repeat aspect-video bg-contain w-full max-w-[280px]"
        role="img"
        aria-label="Ilustración de un trípode de topógrafo volcado, simbolizando un error de navegación."
        style={{ backgroundImage: `url("${backgroundImageUrl}")` }}
      />
      <button
        onClick={handleGoHome}
        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
        type="button"
      >
        <span className="truncate">Volver a la Página Principal</span>
      </button>
      <p className="text-gray-600 text-sm font-normal leading-normal pt-2">
        <a
          className="underline hover:text-primary dark:hover:text-primary"
          href="/servicios"
        >
          O explora nuestros servicios
        </a>
      </p>
    </div>
  );
};

export default NotFoundLandingPage;
