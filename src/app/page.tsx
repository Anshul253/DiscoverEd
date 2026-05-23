import { CollegeCard } from '@/components/CollegeCard';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams; // Next.js 15 requires awaiting searchParams
  
  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : '';
  const location = typeof resolvedSearchParams.location === 'string' ? resolvedSearchParams.location : '';
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const whereClause: any = {};

  if (search) {
    whereClause.name = { contains: search };
  }
  if (location) {
    whereClause.location = { contains: location };
  }

  const colleges = await prisma.college.findMany({
    where: whereClause,
    skip,
    take: limit,
    orderBy: { rating: 'desc' },
    include: {
      _count: {
        select: { courses: true }
      }
    }
  });

  const total = await prisma.college.count({ where: whereClause });
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-72 shrink-0 space-y-6">
        <div className="glass-panel p-6 rounded-2xl sticky top-24 border border-white/10">
          <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 drop-shadow-sm mb-5">Filters</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="search" className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Search</label>
              <input
                type="text"
                id="search"
                name="search"
                defaultValue={search}
                placeholder="College name..."
                className="w-full glass-input rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                defaultValue={location}
                placeholder="City or state..."
                className="w-full glass-input rounded-xl px-4 py-2.5 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-neon py-2 text-sm font-medium"
            >
              Apply Filters
            </button>
            {(search || location) && (
              <Link href="/" className="block w-full text-center text-sm text-fuchsia-500 hover:text-fuchsia-400 dark:text-fuchsia-400 hover:underline">
                Clear Filters
              </Link>
            )}
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 dark:from-fuchsia-400 dark:to-cyan-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)] tracking-tight">Discover Colleges</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">Found <span className="font-extrabold text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">{total}</span> colleges matching your criteria.</p>
        </div>

        {colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                id={college.id}
                name={college.name}
                location={college.location}
                fees={college.fees}
                rating={college.rating}
                coursesCount={college._count.courses}
                images={college.images}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 text-center rounded-2xl">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No colleges found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters to find what you're looking for.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const params = new URLSearchParams();
              if (search) params.set('search', search);
              if (location) params.set('location', location);
              params.set('page', p.toString());
              
              return (
                <Link
                  key={p}
                  href={`/?${params.toString()}`}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    page === p 
                      ? 'btn-neon shadow-[0_0_15px_rgba(217,70,239,0.5)]' 
                      : 'bg-white/10 dark:bg-black/30 border border-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-white/10'
                  }`}
                >
                  {p}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
