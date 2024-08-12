'use server';

import { z } from 'zod';

import db from '@/lib/db';
import { productSchema } from '@/schemas';

export const createProduct = async (data: z.infer<typeof productSchema>) => {
  const validatedData = productSchema.safeParse(data);

  if (!validatedData.success) {
    throw new Error('Invalid data');
  }

  const { name, description, status, category, price, variants } = validatedData.data;

  try {
    await db.product.create({
      data: {
        name,
        description,
        status,
        category,
        price,
        variants: {
          create: variants.map(variant => ({
            stock: variant.stock,
            color: variant.color,
            size: variant.size,
          })),
        },
      },
    });
  } catch (error) {
    return { error: 'Error creating product' };
  }

  return {
    success: `Product ${name} created!`,
  };
};
