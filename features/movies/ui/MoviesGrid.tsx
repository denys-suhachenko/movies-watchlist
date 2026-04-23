import { MovieCard } from './MovieCard';

export function MoviesGrid({ movies }: { movies: any[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10 lg:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
