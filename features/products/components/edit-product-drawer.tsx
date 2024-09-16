import { useNewProduct } from '@/features/products/hooks/use-new-product';

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { createProduct } from '../actions/create-product';
import { updateProduct } from '../actions/update-product';
import { ProductForm } from './product-form';
import { useOpenProduct } from '../hooks/use-open-product';
import { getProduct } from '../actions/get-product';
import { useGetProduct } from '../hooks/use-get-product';
import { Loader2 } from 'lucide-react';

export const EditProductDrawer = () => {
  const { isOpen, onClose, id } = useOpenProduct();

  const { data, isLoading } = useGetProduct(id);

  const { execute, isPending } = useAction(updateProduct, {
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
          <DrawerTitle>Edit Product</DrawerTitle>
          <DrawerDescription>Edit an existing product in your store.</DrawerDescription>
        </DrawerHeader>
        {isLoading ? (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loader2 className='size-4 text-muted-foreground animate-spin' />
          </div>
        ) : (
          <ProductForm
            id={id}
            onSubmit={execute}
            disabled={isPending}
            initialData={data}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
};
