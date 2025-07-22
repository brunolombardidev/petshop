import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function MeusContratosLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-blue-50/30 to-purple-50/50">
      {/* Header Skeleton */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-10 h-10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header Skeleton */}
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="w-10 h-10 rounded-xl" />
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <div>
                      <Skeleton className="h-3 w-12 mb-1" />
                      <Skeleton className="h-6 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters Skeleton */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="flex-1 h-12 rounded-xl" />
                <div className="flex gap-2">
                  <Skeleton className="w-48 h-12 rounded-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Count Skeleton */}
          <div className="mb-6">
            <Skeleton className="h-5 w-48" />
          </div>

          {/* Contract Cards Skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Provider Avatar Skeleton */}
                    <Skeleton className="w-16 h-16 rounded-xl" />

                    {/* Contract Info Skeleton */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <Skeleton className="h-6 w-48 mb-2" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>

                      {/* Contract Details Grid Skeleton */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Skeleton className="w-4 h-4" />
                          <div>
                            <Skeleton className="h-4 w-8 mb-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Skeleton className="w-4 h-4" />
                          <div>
                            <Skeleton className="h-4 w-20 mb-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Skeleton className="w-4 h-4" />
                          <div>
                            <Skeleton className="h-4 w-12 mb-1" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                      </div>

                      {/* Observations Skeleton */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>

                      {/* Rating Skeleton */}
                      <div className="mb-4 p-3 bg-yellow-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Skeleton className="h-4 w-24" />
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Skeleton key={i} className="w-4 h-4" />
                            ))}
                          </div>
                        </div>
                        <Skeleton className="h-4 w-full" />
                      </div>

                      {/* Action Buttons Skeleton */}
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="h-9 w-20 rounded-xl" />
                        <Skeleton className="h-9 w-20 rounded-xl" />
                        <Skeleton className="h-9 w-24 rounded-xl" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
