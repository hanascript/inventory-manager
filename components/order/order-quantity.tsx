'use client';

import { z } from 'zod';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { orderSchema } from '@/schemas';

export const OrderQuantity = () => {
  const { control, setValue } = useFormContext<z.infer<typeof orderSchema>>();

  // Watch the 'products' field in the form
  const selectedProducts = useWatch({
    control,
    name: 'products', // the name of the field to watch
  });

  useEffect(() => {
    setValue('quantity', selectedProducts.length);
  }, [selectedProducts]);

  return (
    <div>
      <p>Selected Products: {selectedProducts.length}</p>
    </div>
  );
};
