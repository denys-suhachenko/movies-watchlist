import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Merriweather } from 'next/font/google';

import Navbar from '@/shared/layout/Navbar/Navbar';
import Footer from '@/shared/layout/Footer';
import { TooltipProvider } from '@/shared/ui/tooltip';

import './globals.css';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

const serif = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'MovieShelf',
  description: 'Movie discovery and watchlist app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground antialiased">
        <TooltipProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col pt-16">{children}</main>
            <Footer />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
