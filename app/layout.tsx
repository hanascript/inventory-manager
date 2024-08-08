import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';

import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Inventory Manager',
  description: 'Inventory Manager by Nathan Marcellous',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <div className='px-6 md:px-12 mx-auto max-w-7xl'>{children}</div>
      </body>
    </html>
  );
}
