import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import ShelterImage from '@/public/images/hero/shelter.webp';
import Crime101Image from '@/public/images/hero/crime_101.webp';
import TheHousemaidImage from '@/public/images/hero/the_housemaid.webp';
import SuperMarioImage from '@/public/images/hero/super_mario.webp';
import SendHelpImage from '@/public/images/hero/send_help.webp';
import DevilWearsPradaImage from '@/public/images/hero/devil_wears_prada.webp';
import Michael from '@/public/images/hero/michael.webp';
import ProjectHailMary from '@/public/images/hero/project_hail_mary.webp';
import TheOdyssey from '@/public/images/hero/the_odyssey.webp';

import { Button } from '@/shared/ui/button';
import Container from '@/shared/layout/Container';
import { PosterColumn } from './PosterColumn';

const posters = {
  left: [
    {
      key: 'the_housemaid',
      src: TheHousemaidImage,
      alt: 'The Housemaid',
    },
    {
      key: 'shelter',
      src: ShelterImage,
      alt: 'Shelter',
    },
    {
      key: 'crime_101',
      src: Crime101Image,
      alt: 'Crime 101',
    },
  ],
  middle: [
    {
      key: 'super_mario',
      src: SuperMarioImage,
      alt: 'The Super Mario Galaxy Movie',
    },
    {
      key: 'send_help',
      src: SendHelpImage,
      alt: 'Send Help',
    },
    {
      key: 'devil_wears_prada',
      src: DevilWearsPradaImage,
      alt: 'The Devil Wears Prada 2',
    },
  ],
  right: [
    {
      key: 'michael',
      src: Michael,
      alt: 'Michael',
    },
    {
      key: 'project_hail_mary',
      src: ProjectHailMary,
      alt: 'Project Hail Mary',
    },
    {
      key: 'the_odyssey',
      src: TheOdyssey,
      alt: 'The Odyssey',
    },
  ],
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-white">
      <Container className="py-8 lg:py-0">
        <div className="grid min-h-[60vh] items-center gap-12 lg:grid-cols-2">
          <div className="md:py-8">
            <p className="text-primary text-sm font-medium">
              Discover. Save. Review.
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your personal space to discover and track great movies
            </h1>

            <p className="text-muted-foreground mt-6 max-w-xl text-base leading-7 sm:text-lg">
              Movies Watchlist helps you explore films, build your watchlist and
              keep track of what you want to watch next.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="shadow-primary/20 border-ring h-12 min-w-[200px] rounded-full px-8 shadow-md"
              >
                <Link href="/movies">
                  Explore movies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary/20 bg-background/50 h-12 min-w-[200px] rounded-full px-8"
              >
                <Link href="/watchlist">Build watchlist</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative h-[calc(100vh-72px)] max-h-[760px] min-h-[560px] overflow-hidden">
              <div className="grid h-full grid-cols-3 gap-5 xl:gap-6">
                <PosterColumn
                  posters={posters.left}
                  duration={34}
                  startOffset="-80px"
                />

                <PosterColumn
                  posters={posters.middle}
                  duration={42}
                  startOffset="-220px"
                />

                <PosterColumn
                  posters={posters.right}
                  duration={38}
                  startOffset="-140px"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
