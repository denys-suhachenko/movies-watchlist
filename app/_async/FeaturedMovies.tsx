import Container from '@/shared/layout/Container';

import { fetchUpcomingMovies } from '@/features/movies/api';
import { MoviesCarousel } from '@/features/movies/ui';

export async function FeaturedMovies() {
  const { results } = await fetchUpcomingMovies();

  return (
    <section className="bg-white py-12">
      <Container>
        <h2 className="mb-8 text-2xl font-semibold">Upcoming</h2>
        <MoviesCarousel movies={results} />
      </Container>
    </section>
  );
}
