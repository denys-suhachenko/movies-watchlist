import Image from 'next/image';
import Link from 'next/link';
import { FilmIcon } from 'lucide-react';

import Container from '@/shared/layout/Container';
import {
  getActor,
  getActorMovieCredits,
  getActorExternalIds,
  getActorTvCredits,
  getActorCredits,
  getActorImages,
} from '@/features/actors/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

import InstagramIcon from '@/public/icons/social/instagram.svg';
import TikTokIcon from '@/public/icons/social/tiktok.svg';
import TwitterIcon from '@/public/icons/social/twitter.svg';
import { Separator } from '@/shared/ui/separator';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';

type ActorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ActorPage({ params }: ActorPageProps) {
  const { id } = await params;
  const actor = await getActor(id);
  const credits = await getActorCredits(id);
  const images = await getActorImages(id);
  const externalLinks = await getActorExternalIds(id);

  return (
    <Container className="py-8 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="mx-auto w-full lg:max-w-[320px]">
          <div className="mb-8">
            {actor.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                width={300}
                height={450}
                className="h-auto w-full rounded-md object-cover shadow-md"
                sizes="(max-width: 768px) 60vw, 300px"
                priority
              />
            ) : (
              <div className="text-muted-foreground flex aspect-2/3 w-full items-center justify-center rounded-md bg-gray-200 text-sm shadow-md">
                No poster
              </div>
            )}
          </div>

          <Card className="sticky top-24 self-start py-6">
            <CardHeader className="px-6">
              <CardTitle className="text-lg font-semibold">
                Personal Info
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 px-6">
              <div>
                <div className="font-medium">Known for</div>
                <p>{actor.known_for_department}</p>
              </div>

              <div>
                <div className="text-muted-foreground">Gender</div>
                <p>{actor.gender === 1 ? 'Female' : 'Male'}</p>
              </div>

              <div>
                <div className="text-muted-foreground">Birthday</div>
                <p>{actor.birthday}</p>
              </div>

              <div>
                <div className="text-muted-foreground">Place of birth</div>
                <p>{actor.place_of_birth}</p>
              </div>

              <div className="flex justify-center gap-x-4">
                {externalLinks.instagram_id && (
                  <Link
                    href={`https://instagram.com/${externalLinks.instagram_id}`}
                    target="_blank"
                  >
                    <Image
                      src={InstagramIcon}
                      alt="Instagram"
                      width={32}
                      height={32}
                    />
                  </Link>
                )}
                {externalLinks.tiktok_id && (
                  <Link
                    href={`https://www.tiktok.com/${externalLinks.tiktok_id}`}
                    target="_blank"
                  >
                    <Image
                      src={TikTokIcon}
                      alt="TikTok"
                      width={32}
                      height={32}
                    />
                  </Link>
                )}
                {externalLinks.twitter_id && (
                  <Link
                    href={`https://x.com/${externalLinks.twitter_id}`}
                    target="_blank"
                  >
                    <Image
                      src={TwitterIcon}
                      alt="Twitter"
                      width={32}
                      height={32}
                    />
                  </Link>
                )}
              </div>

              <Button
                asChild
                className="w-full bg-yellow-400 text-xs text-black hover:bg-amber-300"
              >
                <Link
                  href={`https://www.imdb.com/name/${actor.imdb_id}`}
                  target="_blank"
                >
                  Open in IMDb
                </Link>
              </Button>
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-8">
          <h1 className="text-2xl font-bold md:text-4xl">{actor.name}</h1>
          <div>
            <h2 className="mb-3 text-lg font-semibold md:text-xl">Biography</h2>
            <p className="whitespace-pre-line">{actor.biography}</p>
          </div>

          <Separator className="hidden md:block" />

          <section className="hidden md:block">
            <h2 className="mb-3 text-lg font-semibold md:text-xl">Photos</h2>

            <div className="max-w-full">
              <ScrollArea className="ring-foreground/10 w-full rounded-md bg-white whitespace-nowrap shadow-xs ring-1">
                <div className="flex w-max gap-4 p-4">
                  {images.profiles.map((img) => (
                    <div
                      key={img.file_path}
                      className="relative aspect-video h-64 shrink-0 overflow-hidden rounded-md bg-neutral-100"
                      style={{ aspectRatio: img.aspect_ratio }}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
                        alt="Backdrop"
                        fill
                        sizes="288px"
                        className="object-cover"
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>

                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="mb-3 text-lg font-semibold md:text-xl">Known for</h2>
            <div className="md: grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
              {credits.cast.map((movie, index) => (
                <Link
                  key={`movie-${movie.id}-${index}`}
                  href={
                    movie.media_type === 'movie'
                      ? `/movies/${movie.id}`
                      : `/tv/${movie.id}`
                  }
                  className="group"
                >
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={`Credit: ${movie.title}`}
                      loading="eager"
                      width={300}
                      height={450}
                      className="w-full rounded-md shadow-md/20 duration-200 select-none group-hover:brightness-80"
                    />
                  ) : (
                    <div className="text-muted-foreground flex aspect-2/3 w-full items-center justify-center rounded-md bg-gray-200 text-sm shadow-md/10 select-none">
                      <FilmIcon className="size-8" />
                    </div>
                  )}
                  <h3 className="mt-2 text-center text-sm font-medium">
                    {movie.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
