import { z } from 'zod';

const fileSchema = z.instanceof(File).refine(file => file.size === 0 || file.type.startsWith('image/'));

const imageSchema = z.array(fileSchema).optional();

const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  status: z.enum(['draft', 'active', 'archived']).default('draft'),
  category: z.string().optional(),
  price: z.coerce
    .number({ invalid_type_error: 'Price must be a number' })
    .positive({ message: 'Price must be a positive number' }),
  variants: z.array(
    z.object({
      stock: z.coerce
        .number({ invalid_type_error: 'Stock must be a number' })
        .positive({ message: 'Stock must be a positive number' }),
      color: z.string().min(3, { message: 'Color must be at least 3 characters long' }),
      size: z.enum(['s', 'm', 'l', 'xl']).default('s'),
    })
  ),
  // image:z
  // .any()
  // .refine((files) => {
  //   return files?.[0]?.size <= MAX_FILE_SIZE;
  // }, `Max image size is 5MB.`)
  // .refine(
  //   (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
  //   "Only .jpg, .jpeg, .png and .webp formats are supported."
  // ),
});
