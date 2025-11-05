import React from 'react'

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const SimpleCard: React.FC<ServiceCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div
        className="w-full h-40 bg-cover bg-center rounded-lg mb-4"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <h3 className="text-lg font-bold text-[#d45500] mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default SimpleCard