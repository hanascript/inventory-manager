'use server';

import db from '@/lib/db';
import { actionClient } from '@/lib/safe-action';
import { customerSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';

export const createCustomer = actionClient
  .schema(customerSchema)
  .action(async ({ parsedInput: { id, name, address, email, phone } }) => {
    if (id) {
      try {
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
      } catch (error) {
        return {
          error: 'Error updating customer',
        };
      }

      revalidatePath('/customers');
      return {
        success: 'Customer updated successfully',
      };
    }

    try {
      await db.customer.create({
        data: {
          name,
          address,
          email,
          phone,
        },
      });
    } catch (error) {
      return {
        error: 'Error creating customer',
      };
    }

    console.log('Create Customer')
    revalidatePath('/customers');
    return {
      success: 'Customer created successfully',
    };
  });
