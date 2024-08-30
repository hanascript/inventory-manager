'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';

export const deleteProduct = actionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('Error deleting product');
    }

    revalidatePath('/products');
    revalidatePath('/');

    return {
      success: 'Product deleted successfully',
    };
  });
