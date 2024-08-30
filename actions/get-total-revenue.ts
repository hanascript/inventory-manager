'use server';

import db from '@/lib/db';

export const getTotalRevenue = async () => {
  const paidOrders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    include: {
      OrderItem: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const itemTotal = order.OrderItem.reduce((itemSum, item) => itemSum + item.product.price * item.quantity, 0);
    return total + itemTotal;
  }, 0);

  return totalRevenue;
};
