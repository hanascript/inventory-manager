import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
  category: z.string().optional(),
  variants: z
    .array(
      z.object({
        price: z.coerce
          .number({ invalid_type_error: 'Price must be a number' })
          .positive({ message: 'Price must be a positive number' }),
        stock: z.coerce
          .number({ invalid_type_error: 'Stock must be a number' })
          .positive({ message: 'Stock must be a positive number' }),
        color: z.string().min(3, { message: 'Color must be at least 3 characters long' }),
        size: z.enum(['s', 'm', 'l', 'xl']).default('s'),
      })
    )
    // .min(1, { message: 'You must have at least one variant' }),
});
