import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import db from '@/lib/db';

export default async function OrdersPage() {
  const orders = await db.order.findMany({
    include: {
      customer: true,
    },
  });

  if (!orders) throw new Error('No orders found');

  return (
    <DataTable
      filter='email'
      columns={columns}
      data={orders}
    />
  );
}
