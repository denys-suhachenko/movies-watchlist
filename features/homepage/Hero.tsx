import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import ShelterImage from '@/public/images/hero/shelter.webp';
import Crime101Image from '@/public/images/hero/crime_101.webp';
import TheHousemaidImage from '@/public/images/hero/the_housemaid.webp';
import SuperMarioImage from '@/public/images/hero/super_mario.webp';
import SendHelpImage from '@/public/images/hero/send_help.webp';
import DevilWearsPradaImage from '@/public/images/hero/devil_wears_prada.webp';

import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
import Container from '@/shared/layout/Container';

const heroImages = [
  {
    key: 1,
    position: 'col-start-3 row-span-2',
    src: ShelterImage,
    alt: 'Shelter',
  },
  {
    key: 2,
    position: 'col-start-2 row-span-2 row-start-2',
    src: Crime101Image,
    alt: 'Crime 101',
  },
  {
    key: 3,
    position: 'col-start-1 row-span-2 row-start-3',
    src: TheHousemaidImage,
    alt: 'The Housemaid',
  },
  {
    key: 4,
    position: 'col-start-2 row-span-2 row-start-4',
    src: SuperMarioImage,
    alt: 'The Super Mario Galaxy Movie',
  },
  {
    key: 5,
    position: 'col-start-3 row-span-2 row-start-3',
    src: SendHelpImage,
    alt: 'Send Help',
  },
  {
    key: 6,
    position: 'col-start-3 row-span-2 row-start-5',
    src: DevilWearsPradaImage,
    alt: 'The Devil Wears Prada 2',
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
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
              MovieShelf helps you explore films, build your watchlist and keep
              track of what you want to watch next.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                className="border-primary h-14 rounded-full px-8 text-base shadow-sm hover:opacity-95"
              >
                <Link href="/movies">
                  Explore movies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="border-border text-foreground hover:bg-primary/10 hover:text-primary h-14 rounded-full bg-white px-8 text-base shadow-sm transition"
              >
                <Link href="/watchlist">Build watchlist</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="h-[560px] overflow-hidden">
              <div className="grid h-[860px] -translate-y-[100px] grid-cols-3 grid-rows-6 gap-5">
                {heroImages.map((image) => (
                  <div
                    key={image.key}
                    className={cn(
                      'relative overflow-hidden rounded-[28px]',
                      image.position,
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      sizes="20vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
