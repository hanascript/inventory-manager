'use client';

import { getCustomer } from '@/features/customers/actions/get-customer';
import { Customer } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useGetCustomer = (id?: string) => {
  const [data, setData] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchCustomer = async () => {
      setIsLoading(true);
      const customer = await getCustomer(id);
      setData(customer);
      setIsLoading(false);
    };

    fetchCustomer();
  }, [id]);

  return { data, isLoading };
};
