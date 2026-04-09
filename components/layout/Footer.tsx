import Link from 'next/link';
import Container from './Container';

const navigationList = [
  {
    id: 1,
    label: 'Movies',
    link: '/',
  },
  {
    id: 2,
    label: 'Watchlist',
    link: '/',
  },
  {
    id: 3,
    label: 'About',
    link: '/',
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <Container className="flex flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="text-lg font-semibold tracking-tight">MovieShelf</p>
          <p className="mt-3 text-sm leading-6 text-white/80">
            Discover movies, build your watchlist, and keep your personal movie
            journey in one place.
          </p>
        </div>

        <div className="flex gap-10 text-sm">
          <div className="space-y-3">
            <p className="font-medium text-white">Navigation</p>
            <div className="flex flex-col gap-2 text-white/90">
              {navigationList.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/25">
        <Container className="flex items-center justify-between px-4 py-4 text-sm text-white">
          <div>&copy; 2026 MovieShelf. All rights reserved.</div>
          <div>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </div>
        </Container>
      </div>
    </footer>
  );
}
