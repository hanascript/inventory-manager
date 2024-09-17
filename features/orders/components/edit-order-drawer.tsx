import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { updateOrder } from '@/features/orders/actions/update-order';
import { OrderForm } from '@/features/orders/components/order-form';
import { useGetOrder } from '@/features/orders/hooks/use-get-order';
import { useOpenOrder } from '@/features/orders/hooks/use-open-order';

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useGetInventory } from '../hooks/use-get-inventory';
import { useGetCustomers } from '@/features/customers/hooks/use-get-customers';
import { useGetProducts } from '@/features/products/hooks/use-get-products';

export const EditOrderDrawer = () => {
  const { isOpen, onClose, id } = useOpenOrder();

  const { data, isLoading } = useGetOrder(id);
  const { data: customers, isLoading: isLoadingCustomers } = useGetCustomers();
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();

  const { execute, isPending } = useAction(updateOrder, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      onClose();
    },
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
  });

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onClose}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Order</DrawerTitle>
          <DrawerDescription>Edit an existing order in your store.</DrawerDescription>
        </DrawerHeader>
        {isLoading || isLoadingCustomers || isLoadingProducts ? (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loader2 className='size-4 text-muted-foreground animate-spin' />
          </div>
        ) : (
          <OrderForm
            id={id}
            onSubmit={execute}
            disabled={isPending}
            initialData={data}
            products={products || []}
            customers={customers || []}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};
