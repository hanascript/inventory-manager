import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import { DrawerProvider } from '@/providers/drawer-provider';
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
      <body className={cn('min-h-screen bg-blue-100 font-sans antialiased', fontSans.variable)}>

        <DrawerProvider />
        <Toaster />
        <div className='mx-auto max-w-6xl md:py-4 h-full'>{children}</div>
      </body>
    </html>
  );
}
