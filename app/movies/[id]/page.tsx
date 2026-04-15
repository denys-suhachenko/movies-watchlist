import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Container from '@/shared/layout/Container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/shared/ui/carousel';
import { formatRuntime } from '@/shared/lib/utils';
import {
  getMovie,
  getMovieCredits,
  getMovieRecommendations,
} from '@/features/movies/api';
import { MovieReviewForm, ReviewsList } from '@/features/movies/ui';
import { prisma } from '@/lib/prisma';

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

const POSTER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15"><rect width="10" height="15" fill="#e5e7eb"/></svg>',
  ).toString('base64');

export default async function MovieDetailsPage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await getMovie(id);
  const { results: recommendations } = await getMovieRecommendations(id);
  const { cast } = await getMovieCredits(id);
  const reviews = await prisma.review.findMany({
    where: {
      movieId: id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div>
      <section className="relative z-0">
        {/* backdrop */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {movie.backdrop_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover opacity-50"
            />
          ) : (
            <div className="bg-muted h-full w-full" />
          )}

          <div className="absolute inset-0 bg-black/80" />
        </div>

        <Container className="px-8 py-8 md:py-16 xl:px-4">
          <div className="grid gap-8 md:grid-cols-[320px_1fr]">
            {/* Poster */}
            <div className="mx-auto w-full md:max-w-[320px]">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="h-auto w-full object-cover shadow-2xl"
                  sizes="(max-width: 768px) 60vw, 300px"
                  priority
                />
              ) : (
                <div className="bg-muted text-muted-foreground flex aspect-2/3 w-full items-center justify-center rounded-2xl text-sm">
                  No poster
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center gap-4">
              <h1 className="text-2xl font-bold text-white md:text-4xl">
                {movie.title}
              </h1>

              <ul className="flex flex-wrap items-center gap-3 text-sm text-white">
                <li>Release date: {movie.release_date}</li>
                <li>Runtime: {formatRuntime(movie.runtime)}</li>
                <li>Rating: {movie.vote_average.toFixed(1)}</li>
              </ul>

              <div className="flex flex-wrap gap-2 text-sm font-medium text-white">
                {movie.genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="outline"
                    className="text-white"
                    asChild
                  >
                    <Link href={`/movies?genre=${genre.id}`}>{genre.name}</Link>
                  </Badge>
                ))}
              </div>

              <div className="text-white">
                <h3 className="mb-2 text-xl font-semibold">Overview</h3>
                <p className="text-sm leading-7 md:text-base">
                  {movie.overview}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  asChild
                  className="rounded-sm bg-yellow-300 text-black hover:bg-amber-200"
                >
                  <Link
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                  >
                    Open in IMDb
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid gap-8 px-8 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-8">
            <section>
              <h2 className="mb-3 text-2xl font-semibold">Overview</h2>
              <p className="text-muted-foreground leading-7">
                {movie.overview}
              </p>
            </section>

            <section>
              <ReviewsList movieId={movie.id} reviews={reviews} />
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Top Cast</h2>

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
                            <div>
                              <Image
                                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                                alt={person.name}
                                loading="eager"
                                width={300}
                                height={450}
                                placeholder="blur"
                                blurDataURL={POSTER_BLUR_DATA_URL}
                                className="w-full select-none"
                              />
                              <h3 className="bg-muted mt-2 font-medium">
                                {person.name}
                              </h3>
                            </div>
                          </CarouselItem>
                        ),
                    )}
                  </CarouselContent>

                  <CarouselPrevious className="bg-primary left-0 hidden translate-y-0! text-white md:flex" />
                  <CarouselNext className="bg-primary right-0 hidden translate-y-0! text-white md:flex" />
                </Carousel>
              </div>
            </section>
          </div>

          <aside>
            <Card className="sticky top-24 py-6">
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 px-6 text-sm">
                <div>
                  <p className="text-muted-foreground">Release date</p>
                  <p>{movie.release_date}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p>{movie.status}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Original language</p>
                  <p>{movie.original_language}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Budget</p>
                  <p>{movie.budget}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Revenue</p>
                  <p>{movie.revenue}</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <section className="px-8 py-10">
          <h2 className="mb-4 text-2xl font-semibold">You may also like</h2>

          <div className="overflow-hidden">
            <Carousel
              opts={{
                align: 'start',
                loop: false,
              }}
              className="w-full px-12"
            >
              <CarouselContent className="-ml-4 w-full">
                {recommendations.map((movie) => (
                  <CarouselItem
                    key={movie.id}
                    className="min-w-0 basis-1/2 pl-4 sm:basis-1/4 lg:basis-1/6"
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
                          className="w-full select-none"
                        />
                      ) : (
                        <div className="bg-muted aspect-2/3" />
                      )}
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="bg-primary left-0 hidden translate-y-0! text-white md:flex" />
              <CarouselNext className="bg-primary right-0 hidden translate-y-0! text-white md:flex" />
            </Carousel>
          </div>
        </section>
      </Container>
    </div>
  );
}
