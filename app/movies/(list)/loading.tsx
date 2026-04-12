import Container from '@/shared/layout/Container';
import { MoviesSkeleton } from '@/features/movies/ui';

export default function Loading() {
  return (
    <Container className="px-6 py-6 xl:px-0">
      <MoviesSkeleton />
    </Container>
  );
}
