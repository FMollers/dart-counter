import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/ui/theme-provider';
import { GamesProvider } from '@/context/games-context';
import { PlayersProvider } from '@/context/players-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dart Counter',
  description: 'Calculation tool for Dart',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* TODO: LOOK INTO TWO PROVIDERS WRAPPING EACHOTHER */}
        <GamesProvider>
          <PlayersProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </PlayersProvider>
        </GamesProvider>
      </body>
    </html>
  );
}
