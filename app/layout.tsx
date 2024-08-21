import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from '@/app/api/uploadthing/core';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import Component from '@/components/wip2';

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
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Toaster
          visibleToasts={8}
          closeButton={true}
        />
        <div className='mx-auto max-w-6xl h-full w-full'>{children}</div>
      </body>
    </html>
  );
}
