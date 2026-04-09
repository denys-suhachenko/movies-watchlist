import { MoviesGrid, MoviesSkeleton } from '@/components/movies';
import { MoviesFilters } from '@/components/movies/MoviesFilters';
import { Pagination } from '@/components/movies/Pagination';

export default async function MoviesPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Movies</h1>
        <p className="text-muted-foreground">
          Browse popular movies, search by title, and filter by year.
        </p>
      </div>

      <MoviesFilters />

      {/* <MoviesGrid movies={[]} /> */}

      <MoviesSkeleton />

      <div className="mt-16">
        <Pagination currentPage={1} totalPages={2} />
      </div>
    </section>
  );
}
