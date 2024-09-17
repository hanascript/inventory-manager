'use server';

import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { orderDeleteSchema } from '@/features/orders/types';

export const bulkDeleteOrder = actionClient.schema(orderDeleteSchema).action(async ({ parsedInput: { ids } }) => {
  await db.order.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  revalidatePath('/orders');

  revalidatePath('/');

  return {
    successful: true,
    message: 'Orders deleted successfully!',
  };
});
