'use client';

import { toast } from 'sonner';
import { useAction } from 'next-safe-action/hooks';
import { Plus } from 'lucide-react';

import { Product } from '@prisma/client';

import { MAX_PRODUCTS } from '@/constants';

import { DataTable } from '@/components/data-table';
import { Footer } from '@/components/footer';
import { columns } from '@/features/products/components/columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNewProduct } from '@/features/products/hooks/use-new-product';
import { Button } from '@/components/ui/button';
import { bulkDeleteProduct } from '@/features/products/actions/bulk-delete-product';

type Props = {
  products: Product[];
};

export const ProductClient = ({ products }: Props) => {
  const newProduct = useNewProduct();

  const { execute, isPending } = useAction(bulkDeleteProduct, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
    },
    onError: () => {
      toast.error('Error deleting products');
    },
  });

  return (
    <Card className='flex-1 border-none rounded-none md:rounded-2xl shadow-md flex flex-col'>
      <CardHeader className='p-3 px-6 bg-muted/80 rounded-none md:rounded-t-2xl flex flex-row justify-between items-center border-b'>
        <div>
          <CardTitle className='text-lg'>Products</CardTitle>
          <CardDescription className='text-xs'>
            Max Products: {products.length}/{MAX_PRODUCTS}
          </CardDescription>
        </div>
        <Button
          size='sm'
          className='text-sm gap-1'
          onClick={newProduct.onOpen}
        >
          <Plus className='size-4 mr-2' />
          Add new
        </Button>
      </CardHeader>
      <CardContent className='p-0 flex-1'>
        <DataTable
          filterKey='name'
          columns={columns}
          data={products}
          onDelete={row => {
            const ids = row.map(r => r.original.id);
            execute({ ids });
          }}
          disabled={isPending}
        />
      </CardContent>
      <Footer />
    </Card>
  );
};
