'use client';

import { z } from 'zod';
import { Product } from '@prisma/client';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { orderSchema } from '@/schemas';

import { CardWrapper } from '@/components/card-wrapper';

type Props = {
  products: Product[];
};

export const OrderProducts = ({ products }: Props) => {
  const { setValue, control } = useFormContext<z.infer<typeof orderSchema>>();

  return (

      
  );
};
