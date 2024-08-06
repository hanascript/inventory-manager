import Link from 'next/link';
import { Package2 } from 'lucide-react';

export const Logo = () => {
  return (
    <Link
      href='#'
      className='flex items-center gap-2 text-lg font-semibold md:text-base'
    >
      <Package2 className='h-6 w-6' />
      <span className='sr-only'>Acme Inc</span>
    </Link>
  );
};
