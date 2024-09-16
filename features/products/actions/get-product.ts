'use server';

import db from '@/lib/db';

export const getProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};
