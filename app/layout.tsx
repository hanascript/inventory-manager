import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

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
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Toaster
          visibleToasts={8}
          closeButton={true}
        />
        <div className='mx-auto max-w-7xl'>{children}</div>
      </body>
    </html>
  );
}
