import { MoviesGrid } from '@/components/movies';
import { Pagination } from '@/components/movies/Pagination';
import { fetchMovies } from '@/features/movies/api';

type MoviesAsyncProps = {
  query?: string;
  year?: string;
  genre?: string;
  currentPage: number;
};

export async function MoviesAsync({
  query,
  year,
  genre,
  currentPage,
}: MoviesAsyncProps) {
  const movies = await fetchMovies({
    query,
    page: currentPage,
    year,
    genre,
  });

  return (
    <>
      <MoviesGrid movies={movies.results} />

      <div className="mt-16">
        <Pagination currentPage={currentPage} totalPages={movies.total_pages} />
      </div>
    </>
  );
}
