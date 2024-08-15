'use server';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { productSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

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
      return {
        error: 'Error deleting product',
      };
    }

    revalidatePath('/products');
    return {
      success: 'Product deleted successfully',
    };
  });
