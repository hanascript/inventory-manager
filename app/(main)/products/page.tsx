import Link from 'next/link';
import { PlusCircle, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from './data-table';
import db from '@/lib/db';
import { columns } from './columns';

export default async function ProductsPage() {
  const products = await db.product.findMany();

  if (!products) throw new Error('No products found');

  return (
    <>
      <div className='ml-auto flex items-center gap-2'>
        <Button
          size='sm'
          className='h-8 gap-1 ml-auto'
          asChild
        >
          <Link href='/add-product'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Add Product</span>
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={products}
      />
    </>
  );
}
