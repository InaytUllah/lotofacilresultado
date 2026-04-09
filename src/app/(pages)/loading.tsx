export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-4 bg-white/20 rounded w-32 mb-4 animate-pulse" />
          <div className="h-10 bg-white/20 rounded-lg w-2/3 mb-4 animate-pulse" />
          <div className="h-5 bg-white/15 rounded w-1/2 animate-pulse" />
        </div>
      </section>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-6 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
              <div className="flex gap-2 mb-4">
                {Array.from({ length: 5 }, (_, j) => (
                  <div key={j} className="w-8 h-8 rounded-full bg-gray-200" />
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
