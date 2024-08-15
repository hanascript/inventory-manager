'use server';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { productSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createProduct = actionClient
  .schema(productSchema)
  .action(async ({ parsedInput: { id, name, description, status, price } }) => {
    if (id) {
      try {
        await db.product.update({
          where: {
            id,
          },
          data: {
            name,
            price,
            description,
            status,
          },
        });
      } catch (error) {
        return {
          error: 'Error updating product',
        };
      }

      revalidatePath('/products');
      return {
        success: 'Product updated successfully',
      };
    }

    try {
      await db.product.create({
        data: {
          name,
          price,
          description,
          status,
        },
      });
    } catch (error) {
      return {
        error: 'Error creating product',
      };
    }

    revalidatePath('/products');
    return {
      success: 'Product created successfully',
    };
  });
