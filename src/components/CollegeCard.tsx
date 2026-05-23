"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, IndianRupee } from 'lucide-react';
import { SaveButton } from './SaveButton';
import { CompareButton } from './CompareButton';

interface CollegeCardProps {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  coursesCount?: number;
  images?: string; // JSON string of urls
}

export function CollegeCard({ id, name, location, fees, rating, coursesCount, images }: CollegeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const parsedImages: string[] = images ? JSON.parse(images) : [];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && parsedImages.length > 1) {
      interval = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % parsedImages.length);
      }, 1500); // change every 1.5 seconds on hover
    } else {
      setImageIndex(0); // reset when not hovered
    }
    return () => clearInterval(interval);
  }, [isHovered, parsedImages.length]);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
        {parsedImages.length > 0 ? (
          <Image 
            src={parsedImages[imageIndex]} 
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 scale-105 hover:scale-110"
          />
        ) : null}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center shadow-sm">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col bg-white/60 dark:bg-gray-900/60 backdrop-blur-md">
        <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-2 line-clamp-2 leading-tight group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
          {name}
        </h3>
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-5 font-medium text-sm">
          <MapPin className="w-4 h-4 mr-1.5 shrink-0 text-blue-500" />
          <span className="truncate">{location}</span>
        </div>
        
        <div className="mt-auto grid grid-cols-2 gap-4 border-t border-gray-100/80 dark:border-gray-800/80 pt-5 mb-5">
          <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-2.5">
            <p className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1 font-semibold">Avg Fees/Year</p>
            <div className="flex items-center text-gray-900 dark:text-white font-bold text-lg">
              <IndianRupee className="w-4 h-4 text-emerald-500 mr-0.5" />
              <span>{fees.toLocaleString('en-IN')}</span>
            </div>
          </div>
          {coursesCount !== undefined && (
            <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-2.5">
              <p className="text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1 font-semibold">Courses</p>
              <p className="text-blue-700 dark:text-blue-300 font-bold text-lg">{coursesCount} <span className="text-sm font-medium">Offered</span></p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <Link href={`/colleges/${id}`} className="w-full bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white text-center py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
            View Details
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <CompareButton collegeId={id} />
            <SaveButton collegeId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
