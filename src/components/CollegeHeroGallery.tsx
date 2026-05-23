"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function CollegeHeroGallery({ images, name }: { images: string[], name: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <>
      {images.map((img, index) => (
        <Image
          key={`${img}-${index}`}
          src={img}
          alt={`${name} - view ${index + 1}`}
          fill
          unoptimized
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-80' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
      
      {images.length > 1 && (
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
