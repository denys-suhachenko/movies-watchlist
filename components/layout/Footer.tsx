import Container from './Container';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <Container className="flex flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="text-lg font-semibold tracking-tight">MovieShelf</p>
          <p className="mt-3 text-sm leading-6 text-white/80">
            Discover movies, build your watchlist, and keep your personal movie
            journey in one place.
          </p>
        </div>
      </Container>

      <div className="border-t border-white/25">
        <Container className="items-center justify-between px-4 py-4 text-sm text-white lg:flex">
          <div className="mb-3 text-center lg:mb-0 lg:text-left">
            &copy; 2026 MovieShelf. All rights reserved.
          </div>
          <div className="mb-3 text-center lg:mb-0 lg:text-left">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </div>
        </Container>
      </div>
    </footer>
  );
}
