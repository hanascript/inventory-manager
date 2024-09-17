import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { createOrder } from '@/features/orders/actions/create-order';
import { OrderForm } from '@/features/orders/components/order-form';
import { useNewOrder } from '@/features/orders/hooks/use-new-order';

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useGetCustomers } from '@/features/customers/hooks/use-get-customers';
import { useGetProducts } from '@/features/products/hooks/use-get-products';

export const NewOrderDrawer = () => {
  const { isOpen, onClose } = useNewOrder();

  const { data: customers, isLoading: isLoadingCustomers } = useGetCustomers();
  const { data: products, isLoading: isLoadingProducts } = useGetProducts();

  const { execute, isPending } = useAction(createOrder, {
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
            <DrawerTitle>New Order</DrawerTitle>
            <DrawerDescription>Create a new order to add to your store.</DrawerDescription>
          </DrawerHeader>
          <div className='overflow-y-visible overflow-auto'>
            <OrderForm
              onSubmit={execute}
              disabled={isPending}
              products={products || []}
              customers={customers || []}
            />
          </div>
        </DrawerContent>
    </Drawer>
  );
};
