'use server';

import db from '@/lib/db';

export const getStockCount = async (storeId: string) => {
  const stockCount = await db.product.count();

  return stockCount;
};
