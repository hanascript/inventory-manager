'use client';

import { useMountedState } from 'react-use';

import { EditProductDrawer } from '@/features/products/components/edit-product-drawer';
import { NewProductDrawer } from '@/features/products/components/new-product-drawer';

export const DrawerProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewProductDrawer />
      <EditProductDrawer />
    </>
  );
};
