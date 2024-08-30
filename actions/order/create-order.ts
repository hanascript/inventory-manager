'use server';

import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { orderSchema } from '@/schemas';

export const createOrder = actionClient
  .schema(orderSchema)
  .action(async ({ parsedInput: { id, customerId, isDelivered, isPaid, OrderItem: products } }) => {
    try {
      if (id === 'new') {
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
      } else {
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
      }
    } catch (error) {
      throw new Error('An error occurred.');
    }

    revalidatePath('/orders');
    revalidatePath('/');

    return {
      success: 'Order updated successfully.',
    };
  });
