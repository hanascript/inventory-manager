import { OrderForm } from '@/components/order/order-form';
import { ProductForm } from '@/components/product/product-form';
import db from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function OrdersFormPage({ params }: { params: { orderId: string } }) {
  if (!params.orderId) redirect('/orders');

  const customers = await db.customer.findMany();
  const products = await db.product.findMany();

  if (params.orderId === 'new') {
    return (
      <OrderForm
        customers={customers}
        products={products}
      />
    );
  }

  const order = await db.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      products: true,
    },
  });

  return (
    <OrderForm
      initialData={order}
      customers={customers}
      products={products}
    />
  );
}
