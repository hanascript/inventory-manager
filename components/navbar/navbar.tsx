import { NAVLINKS } from '@/constants';

import { Logo } from './logo';
import { UserBtn } from './user-btn';
import { NavLink } from './nav-link';
import { MobileNavbar } from './mobile-nav';


export const Navbar = () => {
  return (
    <header className='flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6'>
      <div>
        <nav className='hidden gap-6 text-lg font-medium md:flex items-center md:gap-5 md:text-sm lg:gap-6'>
          <Logo />
          {NAVLINKS.map(link => (
            <NavLink
              key={link.href}
              href={link.href}
              text={link.text}
            />
          ))}
        </nav>
        <MobileNavbar links={NAVLINKS} />
      </div>
      <UserBtn />
    </header>
  );
};
