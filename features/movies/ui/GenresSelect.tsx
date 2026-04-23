'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

export type GenreOption = {
  id: string;
  label: string;
};

type GenresSelectProps = {
  genres: GenreOption[];
  value: string;
  className?: string;
  onChange: (value: string) => void;
};

export function GenresSelect({
  genres,
  value,
  className,
  onChange,
}: GenresSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select genre" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all" className="rounded-none">
          All genres
        </SelectItem>

        {genres.map((genre) => (
          <SelectItem key={genre.id} value={genre.id} className="rounded-none">
            {genre.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
