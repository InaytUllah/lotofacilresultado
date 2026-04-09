export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton — matches homepage layout */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-10 bg-white/20 rounded-lg w-2/3 mb-4 animate-pulse" />
          <div className="h-5 bg-white/15 rounded w-1/2 mb-6 animate-pulse" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="h-8 w-28 bg-white/15 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Results grid skeleton */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
              <div className="flex gap-2 justify-center mb-4">
                {Array.from({ length: 5 }, (_, j) => (
                  <div key={j} className="w-10 h-10 rounded-full bg-gray-200" />
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
