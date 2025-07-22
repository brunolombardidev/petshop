import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function BuscarServicosLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50">
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

          {/* Search Bar Skeleton */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="flex-1 h-12 rounded-xl" />
                <div className="flex gap-2">
                  <Skeleton className="h-12 w-24 rounded-xl" />
                  <Skeleton className="h-12 w-24 rounded-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Count Skeleton */}
          <div className="mb-6">
            <Skeleton className="h-5 w-48" />
          </div>

          {/* Provider Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Skeleton className="w-16 h-16 rounded-xl" />
                      <Skeleton className="absolute -top-1 -right-1 w-6 h-6 rounded-full" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-16" />
                          </div>
                        </div>
                        <Skeleton className="w-8 h-8 rounded-xl" />
                      </div>

                      {/* Rating Skeleton */}
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="w-4 h-4" />
                          ))}
                        </div>
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-16" />
                      </div>

                      {/* Location Skeleton */}
                      <div className="flex items-center gap-1">
                        <Skeleton className="w-4 h-4" />
                        <Skeleton className="h-4 w-32" />
                      </div>

                      {/* Specialties Skeleton */}
                      <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-12" />
                      </div>

                      {/* Hours Skeleton */}
                      <div className="flex items-center gap-1">
                        <Skeleton className="w-4 h-4" />
                        <Skeleton className="h-4 w-24" />
                      </div>

                      {/* Services Count Skeleton */}
                      <Skeleton className="h-4 w-40" />

                      {/* Services List Skeleton */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      </div>

                      {/* Action Buttons Skeleton */}
                      <div className="flex gap-2 pt-2">
                        <Skeleton className="flex-1 h-9 rounded-xl" />
                        <Skeleton className="flex-1 h-9 rounded-xl" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-20 rounded-xl" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-10 h-10 rounded-xl" />
              ))}
              <Skeleton className="h-10 w-20 rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
