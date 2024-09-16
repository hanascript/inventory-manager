'use server';

import { revalidatePath } from 'next/cache';
import sanitizeHtml from 'sanitize-html';

import db from '@/lib/db';

import { customerSchema } from '@/features/customers/types';
import { actionClient } from '@/lib/safe-action';

export const updateCustomer = actionClient
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
