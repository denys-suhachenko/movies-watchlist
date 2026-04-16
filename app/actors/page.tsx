import Container from '@/shared/layout/Container';
import { getActors } from '@/features/actors/api';
import { ActorCard } from '@/features/actors/ui';

export default async function ActorsListPage() {
  const { results } = await getActors();

  return (
    <Container className="h-full px-6 py-6 xl:px-0">
      <section className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Actors</h1>
          <p className="text-muted-foreground">
            Browse popular actors and search by name.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5">
          {results.map((actor) => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>
      </section>
    </Container>
  );
}
