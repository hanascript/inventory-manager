'use client';

import { z } from 'zod';
import { Product } from '@prisma/client';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { orderSchema } from '@/schemas';

import { CardWrapper } from '@/components/card-wrapper';

type Props = {
  cart: Product[];
  products: Product[];
};

export const OrderProducts = ({ cart, products }: Props) => {
  const { setValue } = useFormContext<z.infer<typeof orderSchema>>();

  const [selectedProducts, setSelectedProducts] = useState<Product[]>(cart);

  const handleClick = (product: Product) => {
    setSelectedProducts(prev => {
      if (prev.some(p => p.id === product.id)) return prev.filter(p => p.id !== product.id);

      return [...prev, product];
    });
    setValue('products', selectedProducts);
  };

  useEffect(() => {
    setValue('products', selectedProducts);
  }, [selectedProducts]);

  const isProductSelected = (product: Product) => {
    return selectedProducts.some(p => p.id === product.id);
  };

  return (
    <div className='grid grid-cols-3 gap-4 max-h-[500px]'>
      {products.map(product => (
        <div
          key={product.id}
          className={cn('border p-4 rounded-md hover:cursor-pointer', isProductSelected(product) && 'bg-blue-400')}
          onClick={() => handleClick(product)}
        >
          {product.name}
        </div>
      ))}
    </div>
  );
};
