import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { createProduct } from '@/features/products/actions/create-product';
import { ProductForm } from '@/features/products/components/product-form';
import { useNewProduct } from '@/features/products/hooks/use-new-product';

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

export const NewProductDrawer = () => {
  const { isOpen, onClose } = useNewProduct();

  const { execute, isPending } = useAction(createProduct, {
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
          <DrawerTitle>New Product</DrawerTitle>
          <DrawerDescription>Create a new product to add to your store.</DrawerDescription>
        </DrawerHeader>
        <ProductForm
          onSubmit={execute}
          disabled={isPending}
        />
      </DrawerContent>
    </Drawer>
  );
};
