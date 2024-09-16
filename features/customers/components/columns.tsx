'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { deleteCustomer } from '@/features/customers/actions/delete-customer';
import { useOpenCustomer } from '@/features/customers/hooks/use-open-customer';
import { useConfirm } from '@/hooks/use-confirm';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className='hidden md:flex'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className='px-4 font-medium hidden md:block'>{row.original.email}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className='px-4 font-medium'>{row.original.name}</div>;
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => {
      return (
        <Button
          className='hidden md:flex'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Address
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className='px-4 font-medium hidden md:block'>{row.original.address}</div>;
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Phone
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction id={row.original.id} />,
  },
];

const CellAction = ({ id }: { id: string }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'This will permanently delete this customer. This action cannot be undone.'
  );
  const { onOpen } = useOpenCustomer();

  const { execute, isPending } = useAction(deleteCustomer, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
    },
    onError: () => {
      toast.error('Error deleting customer');
    },
  });

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      execute({ id });
    }
  };

  return (
    <>
      <ConfirmDialog />
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
            onClick={() => onOpen(id)}
            disabled={isPending}
          >
            <Edit className='mr-2 h-4 w-4' /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete()}
            disabled={isPending}
          >
            <Trash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
