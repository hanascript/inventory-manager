import { Customer, Product } from '@prisma/client';
import { z } from 'zod';

export const orderDeleteSchema = z.object({
  ids: z.array(z.string()),
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

export type FlattenedOrder = {
  id: string;
  customer: string;
  email: string;
  paid: boolean;
  delivered: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type InventoryData = {
  products: Product[];
  customers: Customer[];
};
