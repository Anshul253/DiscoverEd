"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface SaveComparisonButtonProps {
  collegeIds: string[];
}

export function SaveComparisonButton({ collegeIds }: SaveComparisonButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (collegeIds.length < 2) return;
    
    setIsSaving(true);
    try {
      const title = `Comparison of ${collegeIds.length} Colleges`;
      
      const res = await fetch("/api/comparisons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, collegeIds }),
      });
      
      if (res.ok) {
        setIsSaved(true);
        router.refresh(); // To update dashboard links
      }
    } catch (error) {
      console.error("Failed to save comparison", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (collegeIds.length < 2) return null;

  return (
    <button
      onClick={handleSave}
      disabled={isSaving || isSaved}
      className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors border shadow-sm ${
        isSaved 
          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800" 
          : "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent"
      }`}
    >
      {isSaved ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Saved!
        </>
      ) : (
        <>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Saving..." : "Save Comparison"}
        </>
      )}
    </button>
  );
}
