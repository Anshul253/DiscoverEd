"use client";

import { signOut } from "next-auth/react";

export function UserMenu({ email }: { email: string }) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-md text-xs mr-2 font-bold uppercase">
          Logged In
        </span>
        {email}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
        className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-900/30"
      >
        Log Out
      </button>
    </div>
  );
}
