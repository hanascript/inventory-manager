
import { getOrders } from '@/features/orders/actions/get-orders';
import { OrderClient } from '@/features/orders/components/order-client';

export default async function OrdersPage() {
  const ordersQuery = await getOrders();

  const orders = ordersQuery || [];

  return <OrderClient orders={orders} />;
}
