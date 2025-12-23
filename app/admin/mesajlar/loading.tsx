export default function AdminMesajlarLoading() {
  return (
    <div className="flex min-h-screen bg-warm-concrete">
      {/* Sidebar space */}
      <div className="w-64"></div>

      <div className="flex-1">
        {/* Top Bar Skeleton */}
        <div className="bg-white border-b border-dark-carbon/10 p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-56 bg-dark-carbon/10 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-40 bg-dark-carbon/10 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-24 bg-dark-carbon/10 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Messages Layout Skeleton */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 border-2 border-dark-carbon/10 animate-pulse"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-muted-gold/20 rounded-full"></div>
                      <div>
                        <div className="h-4 w-24 bg-dark-carbon/10 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-dark-carbon/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-3 w-20 bg-muted-gold/20 rounded mb-2"></div>
                  <div className="h-3 w-full bg-dark-carbon/10 rounded mb-1"></div>
                  <div className="h-3 w-3/4 bg-dark-carbon/10 rounded"></div>
                </div>
              ))}
            </div>

            {/* Message Detail Skeleton */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border-2 border-dark-carbon/10 overflow-hidden animate-pulse">
                <div className="p-6 border-b border-dark-carbon/10 bg-gradient-to-r from-night-blue/5 to-muted-gold/5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-muted-gold/20 rounded-full"></div>
                      <div>
                        <div className="h-6 w-32 bg-dark-carbon/10 rounded mb-2"></div>
                        <div className="h-4 w-48 bg-dark-carbon/10 rounded mb-1"></div>
                        <div className="h-4 w-40 bg-dark-carbon/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-6 w-24 bg-muted-gold/20 rounded-full"></div>
                    <div className="h-6 w-32 bg-yellow-100 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="h-6 w-32 bg-dark-carbon/10 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-dark-carbon/10 rounded"></div>
                    <div className="h-4 w-full bg-dark-carbon/10 rounded"></div>
                    <div className="h-4 w-3/4 bg-dark-carbon/10 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
