'use client';

import { Customer } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { MAX_CUSTOMERS } from '@/constants';
import { bulkDeleteCustomer } from '@/features/customers/actions/bulk-delete-customer';
import { columns } from '@/features/customers/components/columns';
import { useNewCustomer } from '@/features/customers/hooks/use-new-customer';

import { DataTable } from '@/components/data-table';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  customers: Customer[];
};

export const CustomerClient = ({ customers }: Props) => {
  const newCustomer = useNewCustomer();

  const { execute, isPending } = useAction(bulkDeleteCustomer, {
    onSuccess: ({ data }) => {
      toast.success(data?.message);
    },
    onError: () => {
      toast.error('Error deleting customers');
    },
  });

  return (
    <Card className='flex-1 border-none rounded-none md:rounded-2xl shadow-md flex flex-col'>
      <CardHeader className='p-3 px-6 bg-muted/80 rounded-none md:rounded-t-2xl flex flex-row justify-between items-center border-b'>
        <div>
          <CardTitle className='text-lg'>Customers</CardTitle>
          <CardDescription className='text-xs'>
            Max Customers: {customers.length}/{MAX_CUSTOMERS}
          </CardDescription>
        </div>
        <Button
          size='sm'
          className='text-sm gap-1'
          onClick={newCustomer.onOpen}
        >
          <Plus className='size-4 mr-2' />
          Add new
        </Button>
      </CardHeader>
      <CardContent className='p-0 flex-1'>
        <DataTable
          filterKey='name'
          columns={columns}
          data={customers}
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
