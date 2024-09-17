'use client';

import { Plus } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { bulkDeleteOrder } from '@/features/orders/actions/bulk-delete-order';
import { columns } from '@/features/orders/components/columns';
import { useNewOrder } from '@/features/orders/hooks/use-new-order';
import { FlattenedOrder } from '@/features/orders/types';

import { DataTable } from '@/components/data-table';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  orders: FlattenedOrder[];
};

export const OrderClient = ({ orders }: Props) => {
  const newOrder = useNewOrder();

  const { execute, isPending } = useAction(bulkDeleteOrder, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
    },
    onError: () => {
      toast.error('Error deleting orders');
    },
  });

  return (
    <Card className='flex-1 border-none rounded-none md:rounded-2xl shadow-md flex flex-col'>
      <CardHeader className='p-3 px-6 bg-muted/80 rounded-none md:rounded-t-2xl flex flex-row justify-between items-center border-b'>
        <div>
          <CardTitle className='text-lg'>Orders</CardTitle>
          <CardDescription className='text-xs'>Total Orders: {orders.length}</CardDescription>
        </div>
        <Button
          size='sm'
          className='text-sm gap-1'
          onClick={newOrder.onOpen}
        >
          <Plus className='size-4 mr-2' />
          Add new
        </Button>
      </CardHeader>
      <CardContent className='p-0 flex-1'>
        <DataTable
          filterKey='customer'
          columns={columns}
          data={orders}
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
