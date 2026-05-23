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
        <div className="edu-card p-6 sticky top-24">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Filters</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="search" className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Search</label>
              <input
                type="text"
                id="search"
                name="search"
                defaultValue={search}
                placeholder="College name..."
                className="w-full edu-input"
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
                className="w-full edu-input"
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary"
            >
              Apply Filters
            </button>
            {(search || location) && (
              <Link href="/" className="block w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline">
                Clear Filters
              </Link>
            )}
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Discover Colleges</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Found <span className="font-bold text-blue-600 dark:text-blue-400">{total}</span> colleges matching your criteria.</p>
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
          <div className="edu-card p-12 text-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No colleges found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters to find what you're looking for.</p>
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    page === p 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
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
