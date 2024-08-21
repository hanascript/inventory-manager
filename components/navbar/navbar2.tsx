import Link from 'next/link';
import { Button } from '../ui/button';
import { Logo } from './logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { MobileNavbar } from './mobile-nav';

import { NAVLINKS } from '@/constants';
import { UserBtn } from './user-btn';
import { DesktopNav } from './desktop-nav';

const LINKS = [
  { href: '/', text: 'Dashboard' },
  { href: '/orders', text: 'Orders' },
  { href: '/products', text: 'Products' },
  { href: '/customers', text: 'Customers' },
  { href: '/analytics', text: 'Analytics' },
];

export const Navbar = () => {
  return (
    <header className='min-h-14 flex items-center justify-between bg-background rounded-none md:rounded-full px-2 md:px-4 md:mt-4 shadow-md border-b md:border-none'>
      <div>
        <DesktopNav />
        <MobileNavbar />
      </div>
      <UserBtn />
    </header>
  );
};
