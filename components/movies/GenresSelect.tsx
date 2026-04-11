'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type GenreOption = {
  id: string;
  label: string;
};

type GenresSelectProps = {
  genres: GenreOption[];
  value: string;
  onChange: (value: string) => void;
};

export function GenresSelect({ genres, value, onChange }: GenresSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select genre" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All genres</SelectItem>

        {genres.map((genre) => (
          <SelectItem key={genre.id} value={genre.id}>
            {genre.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
