'use client';

import { useEffect, useState } from 'react';

import { getInventory } from '@/features/orders/actions/get-inventory';
import { InventoryData } from '@/features/orders/types';

export const useGetInventory = () => {
  const [data, setData] = useState<InventoryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      const inventory = await getInventory();
      setData(inventory);
      setIsLoading(false);
    };

    fetchOrder();
  }, []);

  return { data, isLoading };
};
