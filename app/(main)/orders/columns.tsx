'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteProduct } from '@/actions/product/delete-product';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteOrder } from '@/actions/order/delete-order';

type OrderCollum = {
  id: string;
  customer: string;
  email: string;
  paid: boolean;
  delivered: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<OrderCollum>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'paid',
    header: 'Paid',
    cell: ({ row }) => (
      <Badge variant={row.original.paid ? 'outline' : 'default'}>{row.original.paid ? 'Yes' : 'No'}</Badge>
    ),
  },
  {
    accessorKey: 'delivered',
    header: 'Delivered',
    cell: ({ row }) => (
      <Badge variant={row.original.delivered ? 'outline' : 'default'}>{row.original.delivered ? 'Yes' : 'No'}</Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction id={row.original.id} />,
  },
];

const CellAction = ({ id }: { id: string }) => {
  const router = useRouter();

  const { execute, isPending } = useAction(deleteOrder, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
      router.push('/orders');
    },
    onError: () => {
      toast.error('Error deleting product');
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
            onClick={() => router.push(`/orders/${id}`)}
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
