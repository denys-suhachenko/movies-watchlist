import { MoviesFilters } from '@/components/movies/MoviesFilters';
import { getGenres } from '@/features/movies/api';

type FiltersAsyncProps = {
  year?: string;
  query?: string;
  genre?: string;
};

export async function FiltersAsync({ year, query, genre }: FiltersAsyncProps) {
  const { genres } = await getGenres();

  return (
    <MoviesFilters year={year} query={query} genre={genre} genres={genres} />
  );
}
