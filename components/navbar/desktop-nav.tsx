import {
  NavigationMenu,
  NavigationMenuList
} from '@/components/ui/navigation-menu';

import { NAVLINKS } from '@/constants';

import { NavItem } from './nav-item';

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
