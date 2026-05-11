import Container from '@/shared/layout/Container';
import { fetchTvShows } from '@/features/tv/api';
import { TvShowsGrid } from '@/features/tv/ui/TvShowsGrid';
import { Pagination } from '@/shared/ui/Pagination';
import { TvShowsFilters } from '@/features/tv/ui/MoviesFilters';

type TvPageProps = {
  searchParams: Promise<{
    page?: string;
    year?: string;
    query?: string;
    genre?: string;
  }>;
};

export default async function TvShowsPage({ searchParams }: TvPageProps) {
  const { page, year, query, genre } = await searchParams;

  const currentPage = Math.max(1, Number(page || 1));

  const { results, total_pages } = await fetchTvShows({
    query,
    page: currentPage,
    year,
    genre,
  });

  return (
    <Container className="py-6">
      <section className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">TV Shows</h1>
          <p className="text-muted-foreground">
            Browse popular TV Shows, search by title, and filter by year.
          </p>
        </div>

        <TvShowsFilters year={year} query={query} genre={genre} />

        <TvShowsGrid shows={results} />

        <div className="mt-16">
          <Pagination currentPage={currentPage} totalPages={total_pages} />
        </div>
      </section>
    </Container>
  );
}
