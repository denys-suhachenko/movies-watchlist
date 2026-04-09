export function MoviesSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-[300px] animate-pulse rounded-lg bg-gray-200" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
