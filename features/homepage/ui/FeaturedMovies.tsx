import { Star } from 'lucide-react';

import { Card, CardContent } from '@/shared/ui/card';
import Link from 'next/link';

const featuredMovies = [
  {
    id: 1,
    title: 'Scary Movie',
    image:
      'https://media.themoviedb.org/t/p/w440_and_h660_face/fEDJhRs03QyXvi7Jmz3gKPNXLZR.jpg',
    genre: 'Comedy / Parody',
    rating: '8.8',
  },
  {
    id: 2,
    title: 'Star Wars: The Mandalorian and Grogu',
    image:
      'https://media.themoviedb.org/t/p/w440_and_h660_face/7QujwMB124KqSPbWlLRHBO5wygE.jpg',
    genre: 'Bounty Hunter / Galaxy',
    rating: '8.5',
  },
  {
    id: 3,
    title: 'The Odyssey',
    image:
      'https://media.themoviedb.org/t/p/w440_and_h660_face/gcZonNmYTAHZuIb26ei1vYgT3tB.jpg',
    genre: 'Mythology / Ancient',
    rating: '8.0',
  },
  {
    id: 4,
    title: 'Animal Farm',
    image:
      'https://media.themoviedb.org/t/p/w440_and_h660_face/6pzI1DIlxwAFffw9OZcG6cr031U.jpg',
    genre: 'Corruption / Based on Novel',
    rating: '8.0',
  },
];

export function FeaturedMovies() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-primary text-sm font-medium">Featured movies</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Discover what to watch next
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6">
              A curated selection of standout titles to inspire your next movie
              night.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredMovies.map((movie) => (
            <Card
              key={movie.id}
              className="border-border rounded-md bg-white shadow-sm"
            >
              <CardContent className="p-6">
                <div className="bg-muted aspect-4/5 rounded-md" />

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href=""
                      className="hover:text-primary text-lg font-semibold tracking-tight transition"
                    >
                      {movie.title}
                    </Link>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {movie.genre}
                    </p>
                  </div>

                  <div className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium">
                    <Star className="h-4 w-4 fill-current" />
                    {movie.rating}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
