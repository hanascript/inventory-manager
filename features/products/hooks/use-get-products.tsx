'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/features/products/actions/get-products';
import { Product } from '@prisma/client';

export const useGetProducts = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const products = await getProducts();
      setData(products);
      setIsLoading(false);
    };

    fetchProduct();
  }, []);

  return { data, isLoading };
};
