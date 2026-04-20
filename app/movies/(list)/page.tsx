import { Suspense } from 'react';

import { MoviesFiltersSkeleton, MoviesSkeleton } from '@/features/movies/ui';
import Container from '@/shared/layout/Container';

import { FiltersAsync } from '../_async/FiltersAsync';
import { MoviesAsync } from '../_async/MoviesAsync';

type MoviesPageProps = {
  searchParams: Promise<{
    page?: string;
    year?: string;
    query?: string;
    genre?: string;
  }>;
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const { page, year, query, genre } = await searchParams;

  const currentPage = Math.max(1, Number(page || 1));

  return (
    <Container className="py-6">
      <section className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Movies</h1>
          <p className="text-muted-foreground">
            Browse popular movies, search by title, and filter by year.
          </p>
        </div>

        <Suspense fallback={<MoviesFiltersSkeleton />}>
          <FiltersAsync year={year} query={query} genre={genre} />
        </Suspense>

        <Suspense
          key={`${currentPage}-${year ?? ''}-${query ?? ''}-${genre ?? ''}`}
          fallback={<MoviesSkeleton />}
        >
          <MoviesAsync
            query={query}
            year={year}
            genre={genre}
            currentPage={currentPage}
          />
        </Suspense>
      </section>
    </Container>
  );
}
