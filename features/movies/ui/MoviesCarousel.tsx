import Image from 'next/image';
import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/shared/ui/carousel';

import { MovieListItem } from '../types';

type MoviesCarouselProps = {
  movies: MovieListItem[];
};

const POSTER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15"><rect width="10" height="15" fill="#e5e7eb"/></svg>',
  ).toString('base64');

export function MoviesCarousel({ movies }: MoviesCarouselProps) {
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
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="min-w-0 basis-1/2 pl-4 sm:basis-1/4 lg:basis-1/5"
            >
              <Link
                href={`/movies/${movie.id}`}
                className="block transition duration-300 hover:scale-95"
              >
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    loading="eager"
                    width={300}
                    height={450}
                    placeholder="blur"
                    blurDataURL={POSTER_BLUR_DATA_URL}
                    className="w-full rounded-md select-none"
                  />
                ) : (
                  <div className="bg-muted aspect-2/3 rounded-md" />
                )}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="bg-primary left-0 translate-y-0! text-white md:flex" />
        <CarouselNext className="bg-primary right-0 translate-y-0! text-white md:flex" />
      </Carousel>
    </div>
  );
}
