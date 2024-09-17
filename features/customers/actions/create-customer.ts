'use server';

import { revalidatePath } from 'next/cache';

import db from '@/lib/db';

import { MAX_CUSTOMERS } from '@/constants';
import { customerSchema } from '@/features/customers/types';
import { actionClient } from '@/lib/safe-action';

export const createCustomer = actionClient
  .schema(customerSchema.omit({ id: true }))
  .action(async ({ parsedInput: { name, address, email, phone } }) => {
    const customers = await db.customer.findMany();

    if (customers.length >= MAX_CUSTOMERS) {
      throw new Error(`Max Customers reached!`);
    }

    await db.customer.create({
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
      message: 'Customer created successfully!',
    };
  });
