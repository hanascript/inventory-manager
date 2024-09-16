'use server';

import { revalidatePath } from 'next/cache';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { customerSchema } from '@/schemas';

export const createCustomer = actionClient
  .schema(customerSchema)
  .action(async ({ parsedInput: { id, name, address, email, phone } }) => {
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

    revalidatePath('/customers');

    revalidatePath('/');

    return {
      successful: true,
      message: 'Customer updated successfully!',
    };
  });
