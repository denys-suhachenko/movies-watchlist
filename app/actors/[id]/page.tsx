import Image from 'next/image';

import Container from '@/shared/layout/Container';
import {
  getActor,
  getActorCredits,
  getActorExternalIds,
} from '@/features/actors/api';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

import InstagramIcon from '@/public/icons/social/instagram.svg';
import TikTokIcon from '@/public/icons/social/tiktok.svg';
import TwitterIcon from '@/public/icons/social/twitter.svg';

type ActorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ActorPage({ params }: ActorPageProps) {
  const { id } = await params;
  const actor = await getActor(id);
  const credits = await getActorCredits(id);
  const externalLinks = await getActorExternalIds(id);

  return (
    <Container className="py-8 md:py-16">
      <div className="grid gap-8 md:grid-cols-[260px_1fr]">
        <aside className="mx-auto w-full md:max-w-[260px]">
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
            <CardHeader>
              <CardTitle>Personal Info</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 px-6 text-sm">
              <div>
                <div className="text-muted-foreground">Known for</div>
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
          <div>
            <h2 className="mb-3 text-lg font-semibold md:text-xl">Known for</h2>
            <div className="md: grid grid-cols-2 gap-5 md:grid-cols-6">
              {credits.cast.map((movie, index) => (
                <Link
                  key={`${movie.id}-${index}`}
                  href={`/movies/${movie.id}`}
                  className="group"
                >
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      loading="eager"
                      width={300}
                      height={450}
                      className="w-full rounded-md shadow-md/20 duration-200 select-none group-hover:brightness-80"
                    />
                  ) : (
                    <div className="text-muted-foreground flex aspect-2/3 w-full items-center justify-center rounded-md bg-gray-200 text-sm shadow-md/10 select-none">
                      No image
                    </div>
                  )}
                  <h3 className="mt-2 text-center text-sm font-medium">
                    {movie.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
