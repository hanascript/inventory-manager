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

  const flattenedOrders = orders.map(order => {
    return {
      id: order.id,
      customer: order.customer.name,
      email: order.customer.email,
      status: order.status,
      quantity: order.quantity,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  });

  return (
    <DataTable
      ctx='order'
      filter='customer'
      columns={columns}
      data={flattenedOrders}
    />
  );
}
