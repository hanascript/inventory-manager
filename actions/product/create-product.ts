'use server';

import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { productSchema } from '@/schemas';

export const createProduct = actionClient
  .schema(productSchema)
  .action(async ({ parsedInput: { id, name, description, stock, price, isActive, isArchived } }) => {
    try {
      if (id === 'new') {
        await db.product.create({
          data: {
            name,
            price,
            description,
            stock,
            isActive,
            isArchived,
          },
        });
      } else {
        await db.product.update({
          where: {
            id,
          },
          data: {
            name,
            price,
            description,
            stock,
            isActive,
            isArchived,
          },
        });
      }
    } catch (error) {
      throw new Error('Error creating product');
    }

    revalidatePath('/products');

    return {
      success: 'Product updated successfully.',
    };
  });
