'use server';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { orderSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { Order } from '@prisma/client';

export const createOrder = actionClient
  .schema(orderSchema)
  .action(async ({ parsedInput: { id, customerId, products, quantity, status } }) => {
    if (id) {
      try {
        await db.order.update({
          where: {
            id,
          },
          data: {
            customerId,
            quantity,
            status,
            products: {
              set: products.map(product => ({ id: product.id })),
            },
          },
        });
      } catch (error) {
        console.log(error);
        return {
          error: 'Error updating order',
        };
      }

      console.log('Revalidating');
      revalidatePath('/orders');
      return {
        success: 'Order updated successfully',
      };
    }

    try {
      await db.order.create({
        data: {
          customerId,
          quantity,
          status,
          products: {
            connect: products.map(product => ({ id: product.id })),
          },
        },
      });
    } catch (error) {
      console.log(error);
      return {
        error: 'Error creating order',
      };
    }

    console.log('Revalidating');
    revalidatePath('/orders');
    return {
      success: 'Order created successfully',
    };
  });
