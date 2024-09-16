import { z } from 'zod';


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
