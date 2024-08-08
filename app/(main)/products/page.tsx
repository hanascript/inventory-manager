import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  return (
    <>
      <Button
        size='sm'
        className='h-8 gap-1'
        asChild
      >
        <Link href='/add-product'>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Add Product</span>
        </Link>
      </Button>
    </>
  );
}
