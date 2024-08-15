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
import { deleteProduct } from '@/actions/product/delete-product';

type ProductCollum = {
  id: string;
  name: string;
  description: string;
  status: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<ProductCollum>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'draft' ? 'outline' : 'default'}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction id={row.original.id} />,
  },
];

const CellAction = ({ id }: { id: string }) => {
  const router = useRouter();

  const { execute, isPending } = useAction(deleteProduct, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
      router.push('/products');
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
            onClick={() => router.push(`/products/${id}`)}
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
