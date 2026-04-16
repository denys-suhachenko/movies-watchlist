import Link from 'next/link';
import Image from 'next/image';

import { ActorListItem } from '../types';

const POSTER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15"><rect width="10" height="15" fill="#e5e7eb"/></svg>',
  ).toString('base64');

export function ActorCard({ actor }: { actor: ActorListItem }) {
  return (
    <Link href={`/actors/${actor.id}`} className="group">
      {actor.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
          loading="eager"
          width={300}
          height={450}
          placeholder="blur"
          blurDataURL={POSTER_BLUR_DATA_URL}
          className="w-full rounded-sm shadow-xl/20 duration-200 group-hover:brightness-80"
        />
      ) : (
        <div className="bg-muted aspect-2/3 rounded-sm shadow-xl/25" />
      )}
      <h3 className="mt-3 font-medium">{actor.name}</h3>
    </Link>
  );
}
