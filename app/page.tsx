import { Hero } from '@/features/homepage/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="hidden border-b bg-gray-50 py-12 md:block">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="grid opacity-80 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-18">
            {['Netflix', 'HBO Max', 'Prime Video', 'Apple TV'].map((name) => (
              <div
                key={name}
                className="text-muted-foreground text-3xl font-semibold select-none"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
