'use server';

import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { customerSchema } from '@/schemas';

export const createCustomer = actionClient
  .schema(customerSchema)
  .action(async ({ parsedInput: { id, name, address, email, phone } }) => {
    try {
      if (id === 'new') {
        await db.customer.create({
          data: {
            name,
            address,
            email,
            phone,
          },
        });
      } else {
        await db.customer.update({
          where: {
            id,
          },
          data: {
            name,
            address,
            email,
            phone,
          },
        });
      }
    } catch (error) {
      throw new Error('An error occurred.');
    }

    revalidatePath('/customers');
    return {
      success: 'Customers updated successfully',
    };
  });
