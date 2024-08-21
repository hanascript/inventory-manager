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
      <DataTable
        columns={columns}
        data={products}
      />
    </>
  );
}
