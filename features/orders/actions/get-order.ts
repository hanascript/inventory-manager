'use server';

import db from '@/lib/db';

export const getOrder = async (id: string) => {
  const order = await db.order.findUnique({
    where: {
      id,
    },
    include: {
      OrderItem: true,
    },
  });

  return order;
};
