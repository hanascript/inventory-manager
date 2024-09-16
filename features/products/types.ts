import { z } from 'zod';

export const productDeleteSchema = z.object({
  ids: z.array(z.string()),
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is too short.' }),
  description: z.string().min(1, { message: 'Description is too short.' }),
  price: z.coerce
    .number({ invalid_type_error: 'Price must be a number' })
    .positive({ message: 'Price must be a positive number' }),
  stock: z.coerce
    .number({ invalid_type_error: 'Stock must be a number' })
    .positive({ message: 'Stock must be a positive number' }),
  isActive: z.boolean(),
  isArchived: z.boolean(),
});