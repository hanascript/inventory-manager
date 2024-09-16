'use client';

import { useState, useEffect } from 'react';
import { getProduct } from '@/features/products/actions/get-product';
import { Product } from '@prisma/client';

export const useGetProduct = (id?: string) => {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      const product = await getProduct(id);
      setData(product);
      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  return { data, isLoading };
};
