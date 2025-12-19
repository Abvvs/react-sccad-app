import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const SimpleCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <li className="bg-background-light dark:bg-background-dark/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={`${title} en Lago Agrio`}
        width={450}
        height={450}
        className="w-full h-40 object-cover rounded-lg mb-4"
        loading="lazy"
      />
      <h3 className="text-lg font-bold text-[#d45500] mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </li>
  );
};

export default SimpleCard;
