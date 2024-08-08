import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import { Logo } from './logo';
import { NavLink } from './nav-link';

type Props = {
  links: {
    href: string;
    text: string;
  }[];
};

export const MobileNavbar = ({ links }: Props) => {
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
        <nav className='grid gap-6 text-lg font-medium'>
          <Logo />
          {links.map(link => (
            <NavLink
              key={link.href}
              href={link.href}
              text={link.text}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
