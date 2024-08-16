'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';
import { deleteCustomer } from '@/actions/customer/delete-customer';

type CustomerCollum = {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<CustomerCollum>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction id={row.original.id} />,
  },
];

const CellAction = ({ id }: { id: string }) => {
  const router = useRouter();

  const { execute, isPending } = useAction(deleteCustomer, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
      router.push('/customers');
    },
    onError: () => {
      toast.error('Error deleting customer');
    },
  });

  return (
    <div className='w-full flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
          >
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/customers/${id}`)}
            disabled={isPending}
          >
            <Edit className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => execute({ id })}
            disabled={isPending}
          >
            <Trash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
