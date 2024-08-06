import { Logo } from './logo';
import { UserBtn } from './user-btn';
import { NavLink } from './nav-link';
import { MobileNavbar } from './mobile-nav';

const userLinks = [
  { href: '#', text: 'Dashboard' },
  { href: '#', text: 'Orders' },
  { href: '#', text: 'Products' },
  { href: '#', text: 'Customers' },
  { href: '#', text: 'Analytics' },
];

export const Navbar = () => {
  return (
    <header className='sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6'>
      <div>
        <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <Logo />
          {userLinks.map(link => (
            <NavLink
              key={link.href}
              href={link.href}
              text={link.text}
            />
          ))}
        </nav>
        <MobileNavbar userLinks={userLinks} />
      </div>
      <UserBtn />
    </header>
  );
};
