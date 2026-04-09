import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';

export function MovieCard({ movie }: { movie: any }) {
  return (
    <Card
      key={movie.id}
      className="border-border rounded-md bg-white shadow-sm"
    >
      <CardContent className="px-6">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="eager"
            width={300}
            height={450}
            className="rounded-lg"
          />
        ) : (
          <div className="bg-muted aspect-2/3 rounded-md" />
        )}

        <div className="mt-5">
          <div>
            <Link
              href={`/movies/${movie.id}`}
              className="hover:text-primary text-lg font-semibold tracking-tight transition"
            >
              {movie.title}
            </Link>
            <p className="text-muted-foreground mt-1 text-sm">{movie.genre}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
