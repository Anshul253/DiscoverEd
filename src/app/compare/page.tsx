import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { IndianRupee, Star, MapPin, CheckCircle2 } from 'lucide-react';
import { SaveComparisonButton } from '@/components/SaveComparisonButton';

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string | string[] }>
}) {
  const resolvedSearchParams = await searchParams;
  let collegeIds: string[] = [];

  if (resolvedSearchParams.ids) {
    if (Array.isArray(resolvedSearchParams.ids)) {
      collegeIds = resolvedSearchParams.ids;
    } else {
      collegeIds = resolvedSearchParams.ids.split(',');
    }
  }

  // To show how compare works, if no ids are provided, we will fetch the first 3 colleges by default for the MVP
  if (collegeIds.length === 0) {
    const defaultColleges = await prisma.college.findMany({ take: 3, select: { id: true } });
    collegeIds = defaultColleges.map(c => c.id);
  }

  // Ensure we compare at most 3 colleges
  const idsToCompare = collegeIds.slice(0, 3);

  const collegesToCompare = await prisma.college.findMany({
    where: { id: { in: idsToCompare } },
    include: {
      placements: true,
      courses: true,
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compare Colleges</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Compare fees, placements, and ratings side-by-side.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium transition-colors border border-gray-200 dark:border-gray-600 text-center">
            Change Selection
          </Link>
          {collegesToCompare.length >= 2 && (
            <SaveComparisonButton collegeIds={idsToCompare} />
          )}
        </div>
      </div>

      {collegesToCompare.length < 2 ? (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 p-6 rounded-xl text-center">
          Please select at least 2 colleges to compare.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 w-1/4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Features</span>
                </th>
                {collegesToCompare.map(college => (
                  <th key={college.id} className="p-6 border-b border-gray-200 dark:border-gray-700 w-1/4 align-top">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{college.name}</h3>
                    <Link href={`/colleges/${college.id}`} className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                      View full details &rarr;
                    </Link>
                  </th>
                ))}
                {/* Empty column if only 2 colleges selected */}
                {collegesToCompare.length === 2 && <th className="p-6 border-b border-gray-200 dark:border-gray-700 w-1/4"></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              
              {/* Location Row */}
              <tr>
                <td className="p-6 bg-gray-50/50 dark:bg-gray-900/20 font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> Location
                </td>
                {collegesToCompare.map(college => (
                  <td key={college.id} className="p-6 text-gray-900 dark:text-gray-200">
                    {college.location}
                  </td>
                ))}
                {collegesToCompare.length === 2 && <td className="p-6"></td>}
              </tr>

              {/* Rating Row */}
              <tr>
                <td className="p-6 bg-gray-50/50 dark:bg-gray-900/20 font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Star className="w-4 h-4 mr-2" /> Rating
                </td>
                {collegesToCompare.map(college => (
                  <td key={college.id} className="p-6">
                    <div className="flex items-center text-amber-600 dark:text-amber-500 font-bold">
                      {college.rating.toFixed(1)} / 5.0
                    </div>
                  </td>
                ))}
                {collegesToCompare.length === 2 && <td className="p-6"></td>}
              </tr>

              {/* Fees Row */}
              <tr>
                <td className="p-6 bg-gray-50/50 dark:bg-gray-900/20 font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <IndianRupee className="w-4 h-4 mr-2" /> Avg Fees (Yearly)
                </td>
                {collegesToCompare.map(college => (
                  <td key={college.id} className="p-6">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ₹{college.fees.toLocaleString('en-IN')}
                    </span>
                  </td>
                ))}
                {collegesToCompare.length === 2 && <td className="p-6"></td>}
              </tr>

              {/* Median Package Row */}
              <tr>
                <td className="p-6 bg-gray-50/50 dark:bg-gray-900/20 font-medium text-gray-700 dark:text-gray-300">
                  Median Package
                </td>
                {collegesToCompare.map(college => (
                  <td key={college.id} className="p-6 text-indigo-600 dark:text-indigo-400 font-bold">
                    {college.placements.length > 0 
                      ? `₹${college.placements[0].medianPackage.toLocaleString('en-IN')}` 
                      : 'N/A'}
                  </td>
                ))}
                {collegesToCompare.length === 2 && <td className="p-6"></td>}
              </tr>

              {/* Highest Package Row */}
              <tr>
                <td className="p-6 bg-gray-50/50 dark:bg-gray-900/20 font-medium text-gray-700 dark:text-gray-300">
                  Highest Package
                </td>
                {collegesToCompare.map(college => (
                  <td key={college.id} className="p-6 text-blue-600 dark:text-blue-400 font-bold">
                    {college.placements.length > 0 
                      ? `₹${college.placements[0].highestPackage.toLocaleString('en-IN')}` 
                      : 'N/A'}
                  </td>
                ))}
                {collegesToCompare.length === 2 && <td className="p-6"></td>}
              </tr>

              {/* Top Recruiters Row */}
              <tr>
                <td className="p-6 bg-gray-50/50 dark:bg-gray-900/20 font-medium text-gray-700 dark:text-gray-300 align-top">
                  Top Recruiters
                </td>
                {collegesToCompare.map(college => (
                  <td key={college.id} className="p-6 text-sm text-gray-700 dark:text-gray-300 align-top leading-relaxed">
                    {college.placements.length > 0 
                      ? college.placements[0].recruiters
                      : 'N/A'}
                  </td>
                ))}
                {collegesToCompare.length === 2 && <td className="p-6"></td>}
              </tr>

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
