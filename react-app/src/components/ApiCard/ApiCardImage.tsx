import React from 'react';

interface ApiCardImageProps {
  image: string;
  name: string;
}

export function ApiCardImage({ image, name }: ApiCardImageProps) {
  return (
    <div className="relative h-48 overflow-hidden">
      <img
        src={image}
        alt={`${name} illustration`}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}