"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function RemoveSavedButton({ collegeId }: { collegeId: string }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      const res = await fetch(`/api/saved-colleges?collegeId=${collegeId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to remove saved college", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <button
      onClick={handleRemove}
      disabled={isRemoving}
      className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all border border-red-100 dark:border-red-800"
      aria-label="Remove from saved"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
