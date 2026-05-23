import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { CollegeCard } from "@/components/CollegeCard";
import { RemoveSavedButton } from "@/components/RemoveSavedButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/auth/login");
  }

  const userId = (session.user as any).id;

  const savedColleges = await prisma.savedCollege.findMany({
    where: { userId },
    include: {
      college: {
        include: {
          _count: {
            select: { courses: true }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const savedComparisons = await prisma.savedComparison.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          college: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your saved colleges and comparisons.</p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Colleges</h2>
          </div>
          
          {savedColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedColleges.map((item) => (
                <div key={item.id} className="relative group">
                  <RemoveSavedButton collegeId={item.college.id} />
                  <CollegeCard
                    id={item.college.id}
                    name={item.college.name}
                    location={item.college.location}
                    fees={item.college.fees}
                    rating={item.college.rating}
                    coursesCount={item.college._count.courses}
                    images={item.college.images}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't saved any colleges yet.</p>
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                Browse Colleges &rarr;
              </Link>
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Comparisons</h2>
          </div>

          {savedComparisons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedComparisons.map((comparison) => (
                <div key={comparison.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{comparison.title}</h3>
                  <div className="space-y-3 mb-6">
                    {comparison.items.map(item => (
                      <div key={item.id} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 shrink-0"></span>
                        <span className="truncate">{item.college.name}</span>
                      </div>
                    ))}
                  </div>
                  <Link 
                    href={`/compare?ids=${comparison.items.map(i => i.collegeId).join(',')}`}
                    className="inline-block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Comparison
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 text-center border border-dashed border-gray-300 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't saved any comparisons yet.</p>
              <Link href="/compare" className="text-blue-600 hover:text-blue-700 font-medium">
                Start Comparing &rarr;
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
