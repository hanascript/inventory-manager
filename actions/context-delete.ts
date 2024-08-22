'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const contextDelete = async ({ obj, ctx }: { obj: any; ctx: 'product' | 'order' | 'customer' }) => {
  switch (ctx) {
    case 'product':
      await db.product.delete({
        where: {
          id: obj.id,
        },
      });
      revalidatePath('/products');
      break;
    case 'order':
      await db.order.delete({
        where: {
          id: obj.id,
        },
      });
      revalidatePath('/orders');
      break;
    case 'customer':
      await db.customer.delete({
        where: {
          id: obj.id,
        },
      });
      revalidatePath('/customers');
      break;
    default:
      console.log('No context found');
      break;
  }

  return;
};
