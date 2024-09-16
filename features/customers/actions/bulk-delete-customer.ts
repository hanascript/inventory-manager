'use server';

import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { customerDeleteSchema } from '@/features/customers/types';

export const bulkDeleteCustomer = actionClient.schema(customerDeleteSchema).action(async ({ parsedInput: { ids } }) => {
  await db.customer.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  revalidatePath('/customers');

  revalidatePath('/');

  return {
    successful: true,
    message: 'Customers deleted successfully!',
  };
});
