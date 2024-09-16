'use server';

import { revalidatePath } from 'next/cache';
import sanitizeHtml from 'sanitize-html';

import db from '@/lib/db';

import { MAX_PRODUCTS } from '@/constants';
import { productSchema } from '@/features/products/types';
import { actionClient } from '@/lib/safe-action';

export const createProduct = actionClient
  .schema(productSchema.omit({ id: true }))
  .action(async ({ parsedInput: { name, description, stock, price, isActive, isArchived } }) => {
    const products = await db.product.findMany();

    if (products.length >= MAX_PRODUCTS) {
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
