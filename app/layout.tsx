import type { Metadata } from 'next';
import { IBM_Plex_Sans } from 'next/font/google';

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

export const metadata: Metadata = {
  title: 'Movies Watchlist',
  description: 'Movie discovery and watchlist app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} h-full antialiased`}>
      <body className="antialiased">
        <TooltipProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
