'use server';

import db from '@/lib/db';

export const getInventory = async () => {
  const products = await db.product.findMany();
  const customers = await db.customer.findMany();

  const inventory = { products, customers };

  return inventory;
};
