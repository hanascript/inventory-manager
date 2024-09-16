import { DataTable } from '@/components/data-table';
import db from '@/lib/db';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { columns } from './columns';

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
