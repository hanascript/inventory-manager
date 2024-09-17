'use server';

import db from '@/lib/db';

export const getOrders = async () => {
  const orders = await db.order.findMany({
    include: {
      customer: true,
    },
  });

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

  return flattenedOrders;
};
