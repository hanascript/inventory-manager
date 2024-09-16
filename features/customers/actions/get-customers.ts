'use server';

import db from '@/lib/db';

export const getCustomers = async () => {
  const customers = await db.customer.findMany();

  return customers;
};
