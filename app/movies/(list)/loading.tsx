import Container from '@/components/layout/Container';
import { MoviesSkeleton } from '@/components/movies';

export default function Loading() {
  return (
    <Container className="px-6 py-6 xl:px-0">
      <MoviesSkeleton />
    </Container>
  );
}
