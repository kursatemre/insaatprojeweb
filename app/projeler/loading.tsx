export default function ProjelerLoading() {
  return (
    <div className="pt-32 md:pt-28 min-h-screen bg-warm-concrete">
      {/* Hero Section Skeleton */}
      <section className="relative py-24 bg-gradient-to-br from-night-blue via-dark-carbon to-night-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-4 w-32 bg-white/20 rounded mx-auto mb-6"></div>
          <div className="h-12 w-96 bg-white/20 rounded mx-auto mb-6"></div>
          <div className="h-6 w-[600px] bg-white/20 rounded mx-auto"></div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Skeleton */}
          <div className="mb-12 flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-32 bg-white/50 rounded-lg animate-pulse"></div>
            ))}
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border-2 border-dark-carbon/10 overflow-hidden animate-pulse"
              >
                <div className="h-64 bg-gradient-to-br from-night-blue/20 to-muted-gold/20"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-dark-carbon/10 rounded mb-3"></div>
                  <div className="h-4 w-1/2 bg-dark-carbon/10 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-dark-carbon/10 rounded"></div>
                    <div className="h-3 w-5/6 bg-dark-carbon/10 rounded"></div>
                  </div>
                  <div className="mt-6 flex items-center space-x-2">
                    <div className="h-6 w-20 bg-muted-gold/20 rounded-full"></div>
                    <div className="h-6 w-24 bg-muted-gold/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
