'use client';

import { useMountedState } from 'react-use';

import { EditProductDrawer } from '@/features/products/components/edit-product-drawer';
import { NewProductDrawer } from '@/features/products/components/new-product-drawer';

import { EditCustomerDrawer } from '@/features/customers/components/edit-customer-drawer';
import { NewCustomerDrawer } from '@/features/customers/components/new-customer-drawer';

import { NewOrderDrawer } from '@/features/orders/components/new-order-drawer';
import { EditOrderDrawer } from '@/features/orders/components/edit-order-drawer';

export const DrawerProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewProductDrawer />
      <EditProductDrawer />

      <NewCustomerDrawer />
      <EditCustomerDrawer />

      <NewOrderDrawer />
      <EditOrderDrawer />
    </>
  );
};
