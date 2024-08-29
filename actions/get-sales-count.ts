'use server';

import db from '@/lib/db';

export const getSalesCount = async () => {
  const salesCount = await db.order.count({
    where: {
      isPaid: true,
      isDelivered: true,
    },
  });

  return salesCount;
};
