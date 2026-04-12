export function MoviesFiltersSkeleton() {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="h-10 animate-pulse rounded-md bg-gray-200 md:w-80" />
      <div className="h-10 animate-pulse rounded-md bg-gray-200 md:w-40" />
      <div className="h-10 animate-pulse rounded-md bg-gray-200 md:w-40" />
      <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200" />
      <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200" />
    </div>
  );
}
