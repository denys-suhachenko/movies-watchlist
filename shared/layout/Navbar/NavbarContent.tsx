'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PopcornIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { logoutAction } from '@/features/auth/ui/actions';

import Container from '../Container';

type NavbarContentProps = {
  user?: {
    id: string;
    name: string | null;
    email: string;
  } | null;
};

const navigationList = [
  {
    id: 1,
    label: 'Movies',
    link: '/movies',
  },
  {
    id: 2,
    label: 'Actors',
    link: '/actors',
  },
  {
    id: 3,
    label: 'Watchlist',
    link: '/watchlist',
  },
];

export default function NavbarContent({ user }: NavbarContentProps) {
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
      className={cn(
        'fixed top-0 right-0 left-0 z-50 border-b border-gray-200 backdrop-blur-md transition-all duration-300',
        scrolled ? 'bg-white/80 shadow-lg' : 'bg-white',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-x-2 text-xl font-semibold tracking-tight"
        >
          <PopcornIcon /> Movies Watchlist
        </Link>

        <nav className="text-muted-foreground flex items-center gap-6 text-sm font-medium">
          {navigationList.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <Button
              variant="link"
              className="hover:text-foreground px-0 transition-colors"
              onClick={() => logoutAction()}
            >
              Logout
            </Button>
          ) : (
            <Link
              href="/sign-in"
              className="hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
          )}
        </nav>
      </Container>
    </header>
  );
}
