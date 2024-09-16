'use server';

import { revalidatePath } from 'next/cache';
import sanitizeHtml from 'sanitize-html';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { productSchema } from '@/features/products/types';
import { MAX_PRODUCTS } from '@/constants';

export const createProduct = actionClient
  .schema(productSchema)
  .action(async ({ parsedInput: { name, description, stock, price, isActive, isArchived } }) => {
    const products = await db.product.findMany();

    if (products.length >= 7) {
      throw new Error(`Max Products reached!`);
    }

    const sanitizedDescription = sanitizeHtml(description);

    await db.product.create({
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
      message: 'Product created successfully!',
    };
  });
