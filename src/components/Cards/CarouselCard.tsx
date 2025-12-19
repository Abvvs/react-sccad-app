interface CarouselCardProps {
  url: string;
  alt: string;
  overlayText?: string;
}
const CarouselCard: React.FC<CarouselCardProps> = ({
  url,
  alt,
  overlayText,
}) => {
  return (
    <li className="group relative w-[280px] sm:w-[350px] md:w-[450px] aspect-square overflow-hidden rounded-2xl bg-neutral-200">
      {/* Imagen real para SEO */}
      <img
        src={url}
        alt={alt}
        height={450}
        width={450}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* Overlay visual */}
      {overlayText && (
        <div className="absolute inset-0 z-10 grid place-content-center">
          <span
            aria-hidden="true"
            className="bg-linear-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg"
          >
            {overlayText}
          </span>
        </div>
      )}
    </li>
  );
};

export default CarouselCard;
