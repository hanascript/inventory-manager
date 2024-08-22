import Link from 'next/link';
import { PlusCircle, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

import db from '@/lib/db';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';

export default async function ProductsPage() {
  const products = await db.product.findMany();

  if (!products) throw new Error('No products found');

  return (
    <DataTable
      ctx='product'
      filter='name'
      columns={columns}
      data={products}
    />
  );
}
