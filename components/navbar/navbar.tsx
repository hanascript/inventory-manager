
import { MobileNavbar } from './mobile-nav';
import { DesktopNav } from './desktop-nav';
import { UserBtn } from './user-btn';

export const Navbar = () => {
  return (
    <header className='min-h-14 flex items-center justify-between bg-background rounded-none md:rounded-full px-2 md:px-4 shadow-md border-b md:border-none'>
      <div>
        <DesktopNav />
        <MobileNavbar />
      </div>
      <UserBtn />
    </header>
  );
};
