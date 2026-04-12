export function MoviesSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-[320px] animate-pulse rounded-lg bg-gray-300" />
        </div>
      ))}
    </div>
  );
}
