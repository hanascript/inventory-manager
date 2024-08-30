import { create } from 'node:domain';
import { describe } from 'node:test';
import { z } from 'zod';

const fileSchema = z.instanceof(File).refine(file => file.size === 0 || file.type.startsWith('image/'));

const imageSchema = z.array(fileSchema).optional();

const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

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

export const customerSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' }).min(1, {
    message: 'Name is too short.',
  }),
  email: z.string({ required_error: 'Email is required', invalid_type_error: 'Email must be a string' }).email({
    message: 'Email is invalid.',
  }),
  address: z.string({ required_error: 'Address is required', invalid_type_error: 'Address must be a string' }).min(1, {
    message: 'Address is too short.',
  }),
  phone: z.string({ invalid_type_error: 'Phone must be a string' }).min(1, {
    message: 'Phone is too short.',
  }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const orderItemSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number().positive({ message: 'Quantity must be a positive number' }),
});

export const orderSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  isPaid: z.boolean(),
  isDelivered: z.boolean(),
  OrderItem: z.array(orderItemSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
