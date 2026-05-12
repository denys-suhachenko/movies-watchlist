import Image from 'next/image';
import Link from 'next/link';
import { BookmarkIcon } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Container from '@/shared/layout/Container';
import { Toggle } from '@/shared/ui/toggle';
import {
  getTvShow,
  getTvShowCredits,
  getTvShowImages,
  getTvShowRecommendations,
} from '@/features/tv/api';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/shared/ui/carousel';
import { Separator } from '@/shared/ui/separator';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';
import { TvShowSeasonsCard } from '@/features/tv/ui/TvShowSeasonCard';
import { MediaGallery } from '@/shared/ui/MediaGallery';
import { CastGallery } from '@/shared/ui/CastGallery';

type TvShowPageProps = {
  params: Promise<{ id: string }>;
};

const POSTER_BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15"><rect width="10" height="15" fill="#e5e7eb"/></svg>',
  ).toString('base64');

export default async function TvShowDetailsPage({ params }: TvShowPageProps) {
  const { id } = await params;
  const show = await getTvShow(id);
  const { cast } = await getTvShowCredits(id);
  const { backdrops } = await getTvShowImages(id);
  const { results: recommendations } = await getTvShowRecommendations(id);

  const lastSeason = show.seasons
    .filter((season) => season.season_number > 0)
    .sort((a, b) => b.season_number - a.season_number)[0];

  return (
    <div>
      <section className="relative z-0">
        {/* backdrop */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {show.backdrop_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`}
              alt={show.name}
              fill
              className="object-cover opacity-50"
            />
          ) : (
            <div className="bg-muted h-full w-full" />
          )}

          <div className="absolute inset-0 bg-black/80" />
        </div>

        <Container className="py-8 md:py-16">
          <div className="grid gap-8 md:grid-cols-[320px_1fr]">
            {/* Poster */}
            <div className="mx-auto w-full md:max-w-[320px]">
              {show.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  width={300}
                  height={450}
                  className="h-auto w-full rounded-md object-cover shadow-2xl"
                  sizes="(max-width: 768px) 60vw, 300px"
                  priority
                />
              ) : (
                <div className="bg-muted text-muted-foreground flex aspect-2/3 w-full items-center justify-center rounded-md text-sm">
                  No poster
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center gap-4">
              <h1 className="text-2xl font-bold text-white md:text-4xl">
                {show.name}
              </h1>

              {show.tagline && (
                <h2 className="text-lg font-medium text-gray-400 italic md:text-xl">
                  {show.tagline}
                </h2>
              )}

              <ul className="flex flex-wrap items-center gap-3 text-sm text-white">
                <li>Release date: {show.first_air_date}</li>
                <li>Rating: {show.vote_average.toFixed(1)}</li>
              </ul>

              <div className="flex flex-wrap gap-2 text-sm font-medium text-white">
                {show.genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="outline"
                    className="text-white"
                    asChild
                  >
                    <Link href={`/tv?genre=${genre.id}`}>{genre.name}</Link>
                  </Badge>
                ))}
              </div>

              <div className="text-white">
                <h2 className="mb-2 text-xl font-semibold">Overview</h2>
                <p className="text-sm leading-7 md:text-base">
                  {show.overview}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button asChild>
                  <Link href={show.homepage} target="_blank">
                    Open Homepage
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-8">
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Overview</h2>
                <Toggle
                  aria-label="Toggle bookmark"
                  size="sm"
                  variant="outline"
                  className="bg-white"
                >
                  <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />
                  Bookmark
                </Toggle>
              </div>
              <p className="text-muted-foreground leading-7">{show.overview}</p>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Last Season</h2>

              <TvShowSeasonsCard season={lastSeason} />

              <div className="mt-4">
                <Link
                  href={`/tv/${show.id}/seasons`}
                  className="hover:text-primary text-muted-foreground font-medium underline underline-offset-6 transition-colors duration-200"
                >
                  View all seasons
                </Link>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Top Cast</h2>
              <CastGallery cast={cast} />
            </section>

            <Separator />

            <section>
              <h2 className="mb-4 text-2xl font-semibold">Media</h2>
              <MediaGallery images={backdrops} title={show.name} />
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
                  <p>{show.first_air_date}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Number of episodes</p>
                  <p>{show.number_of_episodes}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Number of seasons</p>
                  <p>{show.number_of_seasons}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p>{show.status}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Original language</p>
                  <p>{show.original_language}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p>{show.type}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Network</p>
                  <div className="mt-2 flex items-center gap-1">
                    {show.networks.map((network) => (
                      <div
                        key={network.id}
                        className="flex h-10 w-24 items-center justify-center"
                      >
                        {network.logo_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${network.logo_path}`}
                            alt={network.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span>{network.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <Separator />

        <section className="py-8">
          <h2 className="mb-4 text-2xl font-semibold">
            If you liked{' '}
            <span className="text-muted-foreground italic">{show.name}</span>,
            you might also like...
          </h2>

          <div className="overflow-hidden">
            <Carousel
              opts={{
                align: 'start',
                loop: false,
              }}
              className="w-full px-12"
            >
              <CarouselContent className="-ml-4 w-full">
                {recommendations.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="min-w-0 basis-1/2 pl-4 sm:basis-1/4 md:basis-1/6"
                  >
                    <Link
                      href={`/tv/${item.id}`}
                      className="block transition duration-300 hover:scale-95"
                    >
                      {item.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                          alt={item.name}
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
                      <h3 className="mt-2 text-sm font-medium md:text-base">
                        {item.name}
                      </h3>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="bg-primary left-0 flex -translate-y-10! text-white md:-translate-y-8!" />
              <CarouselNext className="bg-primary right-0 flex -translate-y-10! text-white md:-translate-y-8!" />
            </Carousel>
          </div>
        </section>
      </Container>
    </div>
  );
}
