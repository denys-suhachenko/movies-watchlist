import Link from 'next/link';
import Image from 'next/image';

import { MovieListItem } from '@/features/movies/types';

const POSTER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15"><rect width="10" height="15" fill="#e5e7eb"/></svg>',
  ).toString('base64');

export function MovieCard({ movie }: { movie: MovieListItem }) {
  return (
    <Link href={`/movies/${movie.id}`} className="group">
      {movie.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          loading="eager"
          width={300}
          height={450}
          placeholder="blur"
          blurDataURL={POSTER_BLUR_DATA_URL}
          className="w-full rounded-md shadow-xl/20 duration-200 group-hover:brightness-80"
        />
      ) : (
        <div className="bg-muted aspect-2/3 rounded-md shadow-xl/25" />
      )}
      <h3 className="mt-3 font-medium">{movie.title}</h3>
      <div className="mt-1 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-500">{movie.release_date}</p>
      </div>
    </Link>
  );
}
