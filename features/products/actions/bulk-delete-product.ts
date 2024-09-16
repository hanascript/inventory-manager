'use server';

import { revalidatePath } from 'next/cache';

import { productDeleteSchema } from '@/features/products/types';
import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';

export const bulkDeleteProduct = actionClient.schema(productDeleteSchema).action(async ({ parsedInput: { ids } }) => {
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
