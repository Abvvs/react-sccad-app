import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const SimpleCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageUrl,
  category,
}) => {
  return (
    <article className="
      group overflow-hidden rounded-2xl
      bg-background-light dark:bg-background-dark/50
      shadow-md hover:shadow-xl
      transition-all duration-300
    ">
      {/* Imagen */}
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Contenido */}
      <div className="p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {category}
        </span>

        <h3 className="mt-2 text-lg font-bold text-foreground">
          {title}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
};

export default SimpleCard;
