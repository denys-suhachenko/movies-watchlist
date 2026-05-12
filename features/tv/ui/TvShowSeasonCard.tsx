import Link from 'next/link';
import Image from 'next/image';

import { TvShowSeason } from '@/features/tv/types';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

const POSTER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15"><rect width="10" height="15" fill="#e5e7eb"/></svg>',
  ).toString('base64');

export function TvShowSeasonsCard({ season }: { season: TvShowSeason }) {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="flex flex-col p-4 sm:flex-row sm:gap-x-4">
        <div className="relative aspect-2/3 w-full shrink-0 sm:w-40">
          {season.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w342${season.poster_path}`}
              alt={season.name}
              fill
              sizes="(max-width: 640px) 100vw, 160px"
              className="object-cover"
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center text-sm">
              No poster
            </div>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="mb-1 text-xl font-semibold">{season.name}</h3>

              <p className="text-muted-foreground text-sm">
                {season.air_date} &middot; {season.episode_count} episodes
              </p>
            </div>

            <Badge variant="secondary">Season {season.season_number}</Badge>
          </div>

          <p className="line-clamp-4 text-sm leading-6">
            {season.overview || 'No overview available for this season.'}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
