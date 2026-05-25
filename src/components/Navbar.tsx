import Link from 'next/link';

export async function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-500 hover:opacity-80 transition-opacity">
              DiscoverEd
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all">
              Colleges
            </Link>
            <Link href="/compare" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all">
              Compare
            </Link>
            <Link href="/dashboard" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-all">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
