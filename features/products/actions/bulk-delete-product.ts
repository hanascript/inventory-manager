'use server';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { deleteSchema } from '../types';
import { revalidatePath } from 'next/cache';

export const bulkDeleteProduct = actionClient.schema(deleteSchema).action(async ({ parsedInput: { ids } }) => {
  await db.product.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  revalidatePath('/products');

  revalidatePath('/');

  return {
    successful: true,
    message: 'Products deleted successfully!',
  };
});
