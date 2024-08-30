import { Menu } from 'lucide-react';

import { NAVLINKS } from '@/constants';

import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { NavItem } from './nav-item';

export const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='shrink-0 md:hidden'
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <NavigationMenu>
          <NavigationMenuList className='grid gap-6 text-lg font-medium mt-8'>
            {NAVLINKS.map(link => (
              <NavItem
                key={link.href}
                href={link.href}
                text={link.text}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
};
