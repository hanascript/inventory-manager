import { z } from 'zod';

const fileSchema = z.instanceof(File).refine(file => file.size === 0 || file.type.startsWith('image/'));

const imageSchema = z.array(fileSchema).optional();

const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: 'Title is required', invalid_type_error: 'Title must be a string' }).min(1, {
    message: 'Title is too short.',
  }),
  description: z
    .string({ required_error: 'Description is required', invalid_type_error: 'Description must be a string' })
    .min(1, {
      message: 'Description is too short.',
    }),
  status: z.enum(['draft', 'active', 'archived'], { required_error: 'Status is required' }),
  price: z.coerce
    .number({ invalid_type_error: 'Price must be a number' })
    .positive({ message: 'Price must be a positive number' }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// export const CreateProduct = z.object({
//   id: z.string().optional(),
//   name: z.string({ required_error: 'Title is required', invalid_type_error: 'Title must be a string' }).min(1, {
//     message: 'Title is too short.',
//   }),
//   description: z
//     .string({ required_error: 'Description is required', invalid_type_error: 'Description must be a string' })
//     .min(1, {
//       message: 'Description is too short.',
//     }),
//   category: z.string().optional(),
//   status: z.enum(['draft', 'active', 'archived'], { required_error: 'Status is required' }),
//   price: z.coerce
//     .number({ invalid_type_error: 'Price must be a number' })
//     .positive({ message: 'Price must be a positive number' }),
//   variants: z.array(
//     z.object({
//       stock: z.coerce
//         .number({ invalid_type_error: 'Stock must be a number' })
//         .positive({ message: 'Stock must be a positive number' }),
//       color: z.string().min(3, { message: 'Color must be at least 3 characters long' }),
//       size: z.enum(['s', 'm', 'l', 'xl']),
//     })
//   ),
// });
