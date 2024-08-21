import Link from 'next/link';
import { PlusCircle, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DataTable } from './data-table';
import db from '@/lib/db';
import { columns } from './columns';

export default async function CustomersPage() {
  const customers = await db.customer.findMany();

  if (!customers) throw new Error('No customers found');

  return (
    <>
      <DataTable
        columns={columns}
        data={customers}
      />
    </>
  );
}
