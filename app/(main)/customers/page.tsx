import Link from 'next/link';
import { PlusCircle, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

import db from '@/lib/db';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';

export default async function CustomersPage() {
  const customers = await db.customer.findMany();

  if (!customers) throw new Error('No customers found');

  return (
    <DataTable
      ctx='customer'
      filter='email'
      columns={columns}
      data={customers}
    />
  );
}
