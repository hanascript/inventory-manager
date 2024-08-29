'use server';

import db from '@/lib/db';

export const getRecentOrders = async () => {
  const recentOrders = await db.order.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      customer: true,
    },
  });

  return recentOrders
};
