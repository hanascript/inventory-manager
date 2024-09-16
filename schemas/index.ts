import { z } from 'zod';

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
