'use server';

import { revalidatePath } from 'next/cache';
import sanitizeHtml from 'sanitize-html';

import db from '@/lib/db';

import { productSchema } from '@/features/products/types';
import { actionClient } from '@/lib/safe-action';

export const updateProduct = actionClient
  .schema(productSchema)
  .action(async ({ parsedInput: { id, name, description, stock, price, isActive, isArchived } }) => {
    const sanitizedDescription = sanitizeHtml(description);

    await db.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        description: sanitizedDescription,
        stock,
        isActive,
        isArchived,
      },
    });

    revalidatePath('/products');

    revalidatePath('/');

    return {
      successful: true,
      message: 'Product updated successfully!',
    };
  });
