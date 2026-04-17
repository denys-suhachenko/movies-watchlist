'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, PopcornIcon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import Container from '../Container';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/movies', label: 'Movies' },
  { href: '/actors', label: 'Actors' },
];

type NavbarContentProps = {
  user?: {
    id: string;
    name: string | null;
    email: string;
  } | null;
};

export function NavbarContent({ user }: NavbarContentProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
        'sticky top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-300',
        scrolled ? 'bg-white/80 shadow-lg' : 'bg-white',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-x-2 font-semibold tracking-tight text-nowrap md:text-xl"
        >
          <PopcornIcon /> Movies Watchlist
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {user ? (
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild className="rounded-sm">
              <Link href="/profile">Profile</Link>
            </Button>
            <Button asChild className="rounded-sm">
              <Link href="/watchlist">My list</Link>
            </Button>
          </div>
        ) : (
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" asChild className="rounded-sm">
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild className="rounded-sm">
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        )}

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[350px]"
              aria-describedby={undefined}
            >
              <SheetHeader className="hidden">
                <SheetTitle>Navigation menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 p-4">
                <Link href="/" className="text-lg font-semibold tracking-tight">
                  Movies Watchlist
                </Link>

                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {user ? (
                  <Button
                    className="rounded-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Logout
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" asChild className="rounded-sm">
                      <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                        Sign in
                      </Link>
                    </Button>

                    <Button asChild className="rounded-sm">
                      <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                        Sign up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
