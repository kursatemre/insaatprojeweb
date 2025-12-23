export default function AdminDashboardLoading() {
  return (
    <div className="flex min-h-screen bg-warm-concrete">
      {/* Sidebar space */}
      <div className="w-64"></div>

      <div className="flex-1">
        {/* Top Bar Skeleton */}
        <div className="bg-white border-b border-dark-carbon/10 p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="h-8 w-48 bg-dark-carbon/10 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-64 bg-dark-carbon/10 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-dark-carbon/10 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-warm-concrete/50 rounded-xl border-2 border-dark-carbon/10 p-6 animate-pulse"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-muted-gold/20 rounded-full"></div>
                  <div className="h-4 w-16 bg-green-100 rounded"></div>
                </div>
                <div className="h-8 w-20 bg-dark-carbon/10 rounded mb-2"></div>
                <div className="h-4 w-32 bg-dark-carbon/10 rounded"></div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border-2 border-dark-carbon/10 p-6 animate-pulse"
              >
                <div className="h-6 w-48 bg-dark-carbon/10 rounded mb-6"></div>
                <div className="h-64 bg-gradient-to-br from-night-blue/5 to-muted-gold/5 rounded"></div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border-2 border-dark-carbon/10 p-6 animate-pulse">
            <div className="h-6 w-40 bg-dark-carbon/10 rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-warm-concrete/30 rounded-lg">
                  <div className="w-10 h-10 bg-muted-gold/20 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-4 w-3/4 bg-dark-carbon/10 rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-dark-carbon/10 rounded"></div>
                  </div>
                  <div className="h-4 w-16 bg-dark-carbon/10 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
