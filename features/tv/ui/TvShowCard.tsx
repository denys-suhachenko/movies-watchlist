import Link from 'next/link';
import Image from 'next/image';
import { FilmIcon } from 'lucide-react';

import { TvShowListItem } from '@/features/tv/types';

const POSTER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15"><rect width="10" height="15" fill="#e5e7eb"/></svg>',
  ).toString('base64');

export function TvShowCard({ show }: { show: TvShowListItem }) {
  return (
    <Link href={`/tv/${show.id}`} className="group">
      {show.poster_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={`Show: ${show.name}`}
          loading="eager"
          width={300}
          height={450}
          placeholder="blur"
          blurDataURL={POSTER_BLUR_DATA_URL}
          className="w-full rounded-md shadow-xl/20 duration-200 group-hover:brightness-80"
        />
      ) : (
        <div className="text-muted-foreground flex aspect-2/3 items-center justify-center rounded-md bg-gray-200 shadow-md/10">
          <FilmIcon className="size-8" />
        </div>
      )}
      <h3 className="group-hover:text-primary mt-3 font-medium">{show.name}</h3>
      <div className="mt-1 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-500">{show.first_air_date}</p>
      </div>
    </Link>
  );
}
