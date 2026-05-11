import { TvShowCard } from './TvShowCard';

export function TvShowsGrid({ shows }: { shows: any[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10 lg:grid-cols-5">
      {shows.map((show) => (
        <TvShowCard key={show.id} show={show} />
      ))}
    </div>
  );
}
