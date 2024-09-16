
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { updateProduct } from '@/features/products/actions/update-product';
import { ProductForm } from '@/features/products/components/product-form';
import { useGetProduct } from '@/features/products/hooks/use-get-product';
import { useOpenProduct } from '@/features/products/hooks/use-open-product';

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

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
