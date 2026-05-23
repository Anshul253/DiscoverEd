import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MapPin, Star, IndianRupee, GraduationCap, Building, Users } from 'lucide-react';
import Link from 'next/link';
import { SaveButton } from '@/components/SaveButton';
import { CompareButton } from '@/components/CompareButton';
import { CollegeHeroGallery } from '@/components/CollegeHeroGallery';

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  const college = await prisma.college.findUnique({
    where: { id },
    include: {
      courses: true,
      placements: true,
      reviews: true,
    }
  });

  if (!college) {
    notFound();
  }

  const images = JSON.parse(college.images || "[]");
  const coverImage = images.length > 0 ? images[0] : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 overflow-hidden mb-12">
        <div className="h-64 md:h-80 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden group">
          <CollegeHeroGallery images={images} name={college.name} />
        </div>
        
        <div className="px-6 py-8 md:px-10 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 -mt-24">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 flex-1 w-full relative z-10 transform -translate-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-4 tracking-tight">{college.name}</h1>
              <div className="flex flex-wrap items-center text-gray-700 dark:text-gray-300 gap-5 mb-6 text-sm font-medium">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{college.location}</span>
                </div>
                <div className="flex items-center bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full ring-1 ring-amber-200/50 dark:ring-amber-800/50">
                  <Star className="w-4 h-4 mr-2 fill-amber-500 text-amber-500" />
                  <span>{college.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg max-w-3xl">
                {college.overview}
              </p>
            </div>
            
            <div className="flex flex-row md:flex-col w-full md:w-48 gap-4 shrink-0 z-10">
              <div className="w-full shadow-lg rounded-xl overflow-hidden hover:-translate-y-1 transition-transform">
                <CompareButton collegeId={college.id} />
              </div>
              <div className="w-full shadow-lg rounded-xl overflow-hidden hover:-translate-y-1 transition-transform">
                <SaveButton collegeId={college.id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Courses Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
              Courses Offered
            </h2>
            <div className="space-y-4">
              {college.courses.map(course => (
                <div key={course.id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-blue-100 dark:hover:border-blue-900 transition-colors">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{course.name}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center space-x-3">
                      <span>{course.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                      <span>{course.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Placements Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Building className="w-6 h-6 mr-2 text-indigo-600" />
              Placements
            </h2>
            {college.placements.map(placement => (
              <div key={placement.id} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl">
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1 font-medium">Median Package</p>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <IndianRupee className="w-5 h-5" />
                      {placement.medianPackage.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1 font-medium">Highest Package</p>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <IndianRupee className="w-5 h-5" />
                      {placement.highestPackage.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">Top Recruiters</p>
                  <p className="text-gray-900 dark:text-gray-200">{placement.recruiters}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Average Fees / Year</p>
                <div className="text-xl font-bold text-gray-900 dark:text-white flex items-center mt-1">
                  <IndianRupee className="w-5 h-5" />
                  {college.fees.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Courses</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{college.courses.length}</p>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              Student Reviews
            </h2>
            <div className="space-y-4">
              {college.reviews.map(review => (
                <div key={review.id} className="pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{review.author}</span>
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-amber-500 mr-1" />
                      <span className="text-xs font-bold">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
