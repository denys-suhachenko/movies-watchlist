import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { FeaturedMovies } from '@/features/homepage/ui';

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="mx-auto grid min-h-[60vh] max-w-7xl items-center gap-12 px-4 py-8 lg:grid-cols-2 lg:py-0">
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
                className="h-14 rounded-full px-8 text-base shadow-sm hover:opacity-95"
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
                <Link href="/">Build watchlist</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="h-[560px] overflow-hidden">
              <div className="grid h-[860px] -translate-y-[100px] grid-cols-3 grid-rows-6 gap-5">
                <div className="relative col-start-3 row-span-2 overflow-hidden rounded-[28px]">
                  <Image
                    src="https://image.tmdb.org/t/p/w1280/buPFnHZ3xQy6vZEHxbHgL1Pc6CR.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>

                <div className="relative col-start-2 row-span-2 row-start-2 overflow-hidden rounded-[28px]">
                  <Image
                    src="https://image.tmdb.org/t/p/w1280/tVvpFIoteRHNnoZMhdnwIVwJpCA.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>

                <div className="relative col-start-1 row-span-2 row-start-3 overflow-hidden rounded-[28px]">
                  <Image
                    src="https://media.themoviedb.org/t/p/w440_and_h660_face/yXGM0cg3mPZlB2kJkFVJo1crrWs.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>

                <div className="relative col-start-2 row-span-2 row-start-4 overflow-hidden rounded-[28px]">
                  <Image
                    src="https://media.themoviedb.org/t/p/original/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>

                <div className="relative col-start-3 row-span-2 row-start-3 overflow-hidden rounded-[28px]">
                  <Image
                    src="https://media.themoviedb.org/t/p/w440_and_h660_face/mjkS2iAgWj3ik1DTjvI15nHZ7yl.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>

                <div className="relative col-start-3 row-span-2 row-start-5 overflow-hidden rounded-[28px]">
                  <Image
                    src="https://media.themoviedb.org/t/p/w440_and_h660_face/sRTYF65JvbHLoC3LoBj4UKYqIlA.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden border-b bg-gray-50 py-12 md:block">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="grid opacity-80 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-18">
            {['Netflix', 'HBO Max', 'Prime Video', 'Apple TV'].map((name) => (
              <div
                key={name}
                className="text-muted-foreground text-3xl font-semibold select-none"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedMovies />
    </>
  );
}
