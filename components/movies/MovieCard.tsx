import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

import { Card, CardContent } from '../ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { MovieListItem } from '@/features/movies/types';

const POSTER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15"><rect width="10" height="15" fill="#e5e7eb"/></svg>',
  ).toString('base64');

export function MovieCard({ movie }: { movie: MovieListItem }) {
  return (
    <Card key={movie.id} className="border-border bg-white shadow-sm">
      <CardContent>
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading="eager"
            width={300}
            height={450}
            placeholder="blur"
            blurDataURL={POSTER_BLUR_DATA_URL}
            className="w-full"
          />
        ) : (
          <div className="bg-muted aspect-2/3" />
        )}

        <div className="p-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/movies/${movie.id}`}
                className="hover:text-primary block overflow-hidden text-lg font-semibold tracking-tight text-nowrap text-ellipsis transition"
              >
                {movie.title}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">{movie.title}</TooltipContent>
          </Tooltip>

          <div className="mt-2 flex items-center justify-between gap-4">
            <p className="text-muted-foreground mt-1 text-sm">
              {movie.release_date}
            </p>
            <div className="text-muted-foreground inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium">
              <Star
                className="h-5 w-5 border-0 fill-yellow-300"
                strokeWidth={0}
              />
              {movie.vote_average.toFixed(1)}/10
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
