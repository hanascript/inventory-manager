'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';

export const deleteOrder = actionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db.order.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error('Error deleting product');
    }

    revalidatePath('/orders');
    revalidatePath('/');

    return {
      success: 'Order deleted successfully',
    };
  });
