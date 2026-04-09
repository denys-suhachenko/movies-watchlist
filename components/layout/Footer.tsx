import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-start md:justify-between">
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
              <Link href="/" className="hover:text-white">
                Movies
              </Link>
              <Link href="/" className="hover:text-white">
                Watchlist
              </Link>
              <Link href="/" className="hover:text-white">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/25">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-white">
          &copy; 2026 MovieShelf. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
