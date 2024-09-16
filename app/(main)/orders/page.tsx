import { DataTable } from '@/components/data-table';
import db from '@/lib/db';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/footer';

import { columns } from './columns';

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
      paid: order.isPaid,
      delivered: order.isDelivered,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  });

  return (
    <DataTable
      filterKey='customer'
      columns={columns}
      data={flattenedOrders}
    />
  );
}
