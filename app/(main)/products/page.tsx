import { DataTable } from '@/components/data-table';
import db from '@/lib/db';

import { columns } from './columns';

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
