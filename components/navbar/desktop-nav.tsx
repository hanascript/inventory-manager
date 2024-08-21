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

import { NAVLINKS } from '@/constants';
import Link from 'next/link';
import { NavItem } from './nav-link';

export const DesktopNav = () => {
  return (
    <nav className='hidden md:flex'>
      <NavigationMenu>
        <NavigationMenuList>
          {NAVLINKS.map(link => (
            <NavItem
              key={link.href}
              href={link.href}
              text={link.text}
            />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
