'use client';

import { getOrder } from '@/features/orders/actions/get-order';
import { Order, OrderItem } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useGetOrder = (id?: string) => {
  const [data, setData] = useState<(Order & { OrderItem: OrderItem[] }) | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      setIsLoading(true);
      const order = await getOrder(id);
      setData(order);
      setIsLoading(false);
    };

    fetchOrder();
  }, [id]);

  return { data, isLoading };
};
