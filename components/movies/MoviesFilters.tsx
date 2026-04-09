'use client';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function MoviesFilters() {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <Input
        placeholder="Search movies..."
        className="h-10 rounded-md border bg-white px-3 md:w-80"
      />

      <Input
        placeholder="Year"
        className="h-10 w-full rounded-md border bg-white px-3 md:w-40"
      />

      <Button>Apply</Button>

      <Button variant="outline">Reset</Button>
    </div>
  );
}
