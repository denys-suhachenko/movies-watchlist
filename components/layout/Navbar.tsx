'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { PopcornIcon } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'fixed top-0 right-0 left-0 z-50 border-b border-gray-200 backdrop-blur-md transition-all duration-300',
        scrolled ? 'bg-white/80 shadow-lg' : 'bg-white',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-x-2 text-xl font-semibold tracking-tight"
        >
          <PopcornIcon /> MovieShelf
        </Link>

        <nav className="text-muted-foreground flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-foreground transition-colors">
            Movies
          </Link>
          <Link href="/" className="hover:text-foreground transition-colors">
            Watchlist
          </Link>
          <Link href="/" className="hover:text-foreground transition-colors">
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
