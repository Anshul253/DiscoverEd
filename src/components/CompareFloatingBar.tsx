"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scale, X } from "lucide-react";

export function CompareFloatingBar() {
  const [compareCount, setCompareCount] = useState(0);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    const updateState = () => {
      const current = JSON.parse(localStorage.getItem("compareList") || "[]");
      setCompareCount(current.length);
      setCompareIds(current);
    };
    
    updateState();
    window.addEventListener("compare-updated", updateState);
    return () => window.removeEventListener("compare-updated", updateState);
  }, []);

  const clearCompare = () => {
    localStorage.removeItem("compareList");
    window.dispatchEvent(new Event("compare-updated"));
  };

  if (compareCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 rounded-full px-4 py-3 flex items-center space-x-4 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
        <Scale className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
        <span>{compareCount} / 3 Selected</span>
      </div>
      
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
      
      <Link 
        href={`/compare?ids=${compareIds.join(',')}`}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
      >
        Compare Now
      </Link>
      
      <button 
        onClick={clearCompare}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Clear selection"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
