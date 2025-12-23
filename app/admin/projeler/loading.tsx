export default function AdminProjelerLoading() {
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
              <div className="h-4 w-32 bg-dark-carbon/10 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-40 bg-muted-gold/20 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border-2 border-dark-carbon/10 p-6 animate-pulse"
              >
                <div className="h-10 w-10 bg-muted-gold/20 rounded-lg mb-4"></div>
                <div className="h-8 w-16 bg-dark-carbon/10 rounded mb-2"></div>
                <div className="h-4 w-24 bg-dark-carbon/10 rounded"></div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="bg-white rounded-xl border-2 border-dark-carbon/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-night-blue/5 to-muted-gold/5">
                  <tr>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <th key={i} className="px-6 py-4">
                        <div className="h-4 bg-dark-carbon/10 rounded animate-pulse"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((row) => (
                    <tr key={row} className="border-t border-dark-carbon/5">
                      {[1, 2, 3, 4, 5, 6].map((col) => (
                        <td key={col} className="px-6 py-4">
                          <div className="h-4 bg-dark-carbon/10 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
