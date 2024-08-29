'use server';

import db from '@/lib/db';

export const getStockCount = async () => {
  const stockCount = await db.product.count({
    where: {
      isActive: true,
    },
  });

  return stockCount;
};
