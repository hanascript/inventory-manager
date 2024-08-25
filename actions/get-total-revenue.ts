'use server';

import db from '@/lib/db';

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    include: {
      products: true,
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.products.reduce((orderSum, product) => {
      return orderSum + product.price;
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
