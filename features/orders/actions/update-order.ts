'use server';

import { revalidatePath } from 'next/cache';
import sanitizeHtml from 'sanitize-html';

import db from '@/lib/db';

import { orderSchema } from '@/features/orders/types';
import { actionClient } from '@/lib/safe-action';

export const updateOrder = actionClient
  .schema(orderSchema)
  .action(async ({ parsedInput: { id, customerId, isDelivered, isPaid, OrderItem: products } }) => {
    await db.orderItem.deleteMany({
      where: {
        orderId: id,
      },
    });

    await db.order.update({
      where: {
        id,
      },
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
      message: 'Order updated successfully!',
    };
  });
