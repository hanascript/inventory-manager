import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { createCustomer } from '@/features/customers/actions/create-customer';
import { CustomerForm } from '@/features/customers/components/customer-form';
import { useNewCustomer } from '@/features/customers/hooks/use-new-customer';

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

export const NewCustomerDrawer = () => {
  const { isOpen, onClose } = useNewCustomer();

  const { execute, isPending } = useAction(createCustomer, {
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
          <DrawerTitle>New Customer</DrawerTitle>
          <DrawerDescription>Create a new customer to add to your store.</DrawerDescription>
        </DrawerHeader>
        <CustomerForm
          onSubmit={execute}
          disabled={isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
