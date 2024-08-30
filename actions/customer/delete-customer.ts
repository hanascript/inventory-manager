'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';

export const deleteCustomer = actionClient
  .schema(
    z.object({
      id: z.string(),
    })
  )
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db.customer.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return {
        error: 'Error deleting customer',
      };
    }

    revalidatePath('/customers');
    revalidatePath('/');

    return {
      success: 'Customer deleted successfully',
    };
  });
