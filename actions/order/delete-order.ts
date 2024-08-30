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
      return {
        error: 'Error deleting order',
      };
    }

    console.log('Deleted Order');

    revalidatePath('/orders');
    redirect('/orders');
  });
