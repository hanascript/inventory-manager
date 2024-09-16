'use server';

import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { orderSchema } from '@/schemas';

export const createOrder = actionClient
  .schema(orderSchema)
  .action(async ({ parsedInput: { id, customerId, isDelivered, isPaid, OrderItem: products } }) => {
    await db.order.create({
      data: {
        customerId,
        isDelivered,
        isPaid,
        OrderItem: {
          create: products.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
    });

    // Update product stocks
    await Promise.all(
      products.map(product =>
        db.product.update({
          where: {
            id: product.productId,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        })
      )
    );

    revalidatePath('/orders');

    revalidatePath('/');

    return {
      successful: true,
      message: 'Order created successfully!',
    };
  });
