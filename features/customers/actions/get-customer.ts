'use server';

import db from '@/lib/db';

export const getCustomer = async (id: string) => {
  const customer = await db.customer.findUnique({
    where: {
      id,
    },
  });

  return customer;
};
