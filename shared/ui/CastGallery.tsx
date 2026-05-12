import Image from 'next/image';
import Link from 'next/link';

import { CastMember } from '../lib/types';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';

type CastGalleryProps = {
  cast: CastMember[];
};

const POSTER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15"><rect width="10" height="15" fill="#e5e7eb"/></svg>',
  ).toString('base64');

export function CastGallery({ cast }: CastGalleryProps) {
  return (
    <div className="overflow-hidden">
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full px-12"
      >
        <CarouselContent className="-ml-4 w-full">
          {cast.map(
            (person) =>
              person.profile_path && (
                <CarouselItem
                  key={person.id}
                  className="min-w-0 basis-1/2 pl-4 sm:basis-1/4 lg:basis-1/5"
                >
                  <Link href={`/actors/${person.id}`} className="group">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                      alt={person.name}
                      loading="eager"
                      width={300}
                      height={450}
                      placeholder="blur"
                      blurDataURL={POSTER_BLUR_DATA_URL}
                      className="w-full rounded-md select-none"
                    />
                    <h3 className="group-hover:text-primary mt-2 text-sm font-medium transition-colors duration-200 md:text-base">
                      {person.name}
                    </h3>
                    <h4 className="text-muted-foreground text-sm">
                      {person.character}
                    </h4>
                  </Link>
                </CarouselItem>
              ),
          )}
        </CarouselContent>

        <CarouselPrevious className="bg-primary left-0 flex -translate-y-10! text-white md:-translate-y-8!" />
        <CarouselNext className="bg-primary right-0 flex -translate-y-10! text-white md:-translate-y-8!" />
      </Carousel>
    </div>
  );
}
