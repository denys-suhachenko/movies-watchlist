'use client';

import React from 'react';
import { Trash2, Star, Clock3, Play, Flame } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';
import Container from '@/shared/layout/Container';

const initialItems = [
  {
    id: 1,
    title: 'Interstellar',
    year: 2014,
    genre: 'Sci-Fi',
    runtime: '2h 49m',
    rating: 8.7,
    poster:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Inception',
    year: 2010,
    genre: 'Action',
    runtime: '2h 28m',
    rating: 8.8,
    poster:
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Blade Runner 2049',
    year: 2017,
    genre: 'Drama',
    runtime: '2h 44m',
    rating: 8.0,
    poster:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Dune: Part Two',
    year: 2024,
    genre: 'Adventure',
    runtime: '2h 46m',
    rating: 8.5,
    poster:
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80',
  },
];

export default function WatchlistPage() {
  const [items, setItems] = React.useState(initialItems);

  const removeFromWatchlist = (id: number) => {
    setItems((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="relative overflow-hidden border-b border-slate-200">
        <Container className="relative flex flex-col justify-end py-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">Featured</p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Track movies you want to watch
              </h1>

              <p className="text-sm text-slate-600">
                Build your personal watchlist, save favorites, and keep
                everything in one place.
              </p>
            </div>

            <Card className="w-full rounded-md border-0 shadow-sm md:w-auto">
              <CardContent className="flex items-center gap-3 p-4">
                <div>
                  <p className="text-xs text-slate-500">Total</p>
                  <p className="text-2xl font-semibold text-slate-900">
                    {items.length}
                  </p>
                </div>

                <Badge variant="secondary" className="rounded-full px-3 py-1">
                  Watch later
                </Badge>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <Container className="py-8 md:py-10">
        <main>
          {items.length === 0 ? (
            <Card className="border-slate-200 bg-white text-slate-900 shadow-sm">
              <CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <p className="text-2xl font-semibold">
                  Your watchlist is empty
                </p>
                <p className="mt-3 max-w-md text-sm text-slate-500">
                  Add movies to your personal list
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {items.map((movie) => (
                <Card
                  key={movie.id}
                  className="border-border overflow-hidden bg-white shadow-sm"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="block h-full w-full"
                    />
                  </div>

                  <CardContent className="space-y-4 p-5">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-xl leading-tight font-semibold">
                          {movie.title}
                        </h3>
                        <div className="text-muted-foreground inline-flex items-center gap-1 text-sm font-medium">
                          <Star
                            className="h-5 w-5 border-0 fill-yellow-300"
                            strokeWidth={0}
                          />
                          {movie.rating}/10
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Button variant="outline" className="flex-1 rounded-sm">
                        <Play className="mr-2 h-4 w-4 fill-current" />
                        Details
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon"
                        className="shrink-0 rounded-sm"
                        onClick={() => removeFromWatchlist(movie.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </Container>
    </div>
  );
}
