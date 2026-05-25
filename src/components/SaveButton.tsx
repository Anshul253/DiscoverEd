"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface SaveButtonProps {
  collegeId: string;
  initialSaved?: boolean;
}

export function SaveButton({ collegeId, initialSaved = false }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSaveToggle = async () => {
    setIsLoading(true);
    try {
      if (isSaved) {
        const res = await fetch(`/api/saved-colleges?collegeId=${collegeId}`, {
          method: "DELETE",
        });
        if (res.ok) setIsSaved(false);
      } else {
        const res = await fetch("/api/saved-colleges", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ collegeId }),
        });
        if (res.ok) setIsSaved(true);
      }
      router.refresh();
    } catch (error) {
      console.error("Failed to toggle save state", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSaveToggle}
      disabled={isLoading}
      className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium transition-colors border ${
        isSaved 
          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/40" 
          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
    >
      {isSaved ? (
        <>
          <BookmarkCheck className="w-4 h-4 mr-2" />
          Saved
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4 mr-2" />
          Save
        </>
      )}
    </button>
  );
}
