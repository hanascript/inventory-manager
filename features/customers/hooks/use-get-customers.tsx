'use client';

import { getCustomers } from '@/features/customers/actions/get-customers';
import { Customer } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useGetCustomers = () => {
  const [data, setData] = useState<Customer[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      setIsLoading(true);
      const customers = await getCustomers();
      setData(customers);
      setIsLoading(false);
    };

    fetchCustomer();
  }, []);

  return { data, isLoading };
};
