'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { toast } from 'sonner';

import { deleteProduct } from '@/features/products/actions/delete-product';
import { useOpenProduct } from '@/features/products/hooks/use-open-product';
import { useConfirm } from '@/hooks/use-confirm';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ProductCollum = {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  isActive: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<ProductCollum>[] = [
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
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    accessorKey: 'price',
    header: () => <div className='text-right'>Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);

      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? 'outline' : 'default'}>{row.original.isActive ? 'Yes' : 'No'}</Badge>
    ),
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
    cell: ({ row }) => (
      <Badge variant={row.original.isArchived ? 'outline' : 'default'}>{row.original.isArchived ? 'Yes' : 'No'}</Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction id={row.original.id} />,
  },
];

const CellAction = ({ id }: { id: string }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'This will permanently delete this product. This action cannot be undone.'
  );
  const { onOpen } = useOpenProduct();

  const { execute, isPending } = useAction(deleteProduct, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
    },
    onError: () => {
      toast.error('Error deleting product');
    },
  });

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      execute({ id });
    }
  };

  return (
    <div className='grid place-items-end'>
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
    </div>
  );
};
