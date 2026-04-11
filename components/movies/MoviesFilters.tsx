'use client';

import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { GenreOption, GenresSelect } from './GenresSelect';
import { Genre } from '@/lib/tmdb';

type MoviesFiltersProps = {
  year?: string;
  query?: string;
  genre?: string;
  genres?: Genre[];
};

function mapGenres(genres: Genre[]): GenreOption[] {
  return genres.map((genre) => ({
    id: String(genre.id),
    label: genre.name,
  }));
}

export function MoviesFilters({
  year,
  query,
  genre,
  genres = [],
}: MoviesFiltersProps) {
  const queryParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedYear, setSelectedYear] = useState<string>(year || '');
  const [selectedQuery, setSelectedQuery] = useState<string>(query || '');
  const [selectedGenre, setSelectetGenre] = useState<string>(genre ?? 'all');

  const normalizedGenres = mapGenres(genres);

  const isDirty =
    selectedYear !== (year ?? '') ||
    selectedQuery !== (query ?? '') ||
    selectedGenre !== (genre ?? '');

  const apply = () => {
    const params = new URLSearchParams(queryParams.toString());

    if (selectedYear.trim()) {
      params.set('year', selectedYear);
    } else {
      params.delete('year');
    }

    if (selectedQuery.trim()) {
      params.set('query', selectedQuery);
    } else {
      params.delete('query');
    }

    if (selectedGenre && selectedGenre !== 'all') {
      params.set('genre', selectedGenre);
    } else {
      params.delete('genre');
    }

    params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
  };

  const reset = () => {
    const params = new URLSearchParams(queryParams.toString());
    params.delete('year');
    params.delete('query');
    params.delete('page');
    params.delete('genre');

    setSelectedYear('');
    setSelectedQuery('');
    setSelectetGenre('all');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <Input
        value={selectedQuery}
        placeholder="Search movies..."
        className="rounded-sm border bg-white px-3 md:w-80"
        onChange={(e) => setSelectedQuery(e.target.value)}
      />

      <Input
        value={selectedYear}
        placeholder="Year"
        className="w-full rounded-sm border bg-white px-3 md:w-40"
        onChange={(e) => setSelectedYear(e.target.value)}
      />

      <GenresSelect
        genres={normalizedGenres}
        value={selectedGenre}
        className="w-full rounded-sm bg-white md:w-48"
        onChange={setSelectetGenre}
      />

      <Button disabled={!isDirty} className="rounded-sm" onClick={apply}>
        Apply
      </Button>

      <Button variant="outline" className="rounded-sm" onClick={reset}>
        Reset
      </Button>
    </div>
  );
}
