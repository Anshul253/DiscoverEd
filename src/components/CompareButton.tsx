"use client";

import { useState, useEffect } from "react";
import { Scale } from "lucide-react";

interface CompareButtonProps {
  collegeId: string;
}

export function CompareButton({ collegeId }: CompareButtonProps) {
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    const checkState = () => {
      const current = JSON.parse(localStorage.getItem("compareList") || "[]");
      setIsComparing(current.includes(collegeId));
    };
    
    checkState();
    window.addEventListener("compare-updated", checkState);
    return () => window.removeEventListener("compare-updated", checkState);
  }, [collegeId]);

  const toggleCompare = () => {
    let current = JSON.parse(localStorage.getItem("compareList") || "[]");
    
    if (isComparing) {
      current = current.filter((id: string) => id !== collegeId);
    } else {
      if (current.length >= 3) {
        alert("You can only compare up to 3 colleges.");
        return;
      }
      current.push(collegeId);
    }
    
    localStorage.setItem("compareList", JSON.stringify(current));
    window.dispatchEvent(new Event("compare-updated"));
  };

  return (
    <button
      onClick={toggleCompare}
      className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition-colors border ${
        isComparing 
          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40" 
          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
    >
      <Scale className="w-4 h-4 mr-2" />
      {isComparing ? "Added" : "Compare"}
    </button>
  );
}
