'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <div>Your Customers</div>
          <Button
            size='sm'
            className='h-8 gap-1 ml-auto'
            asChild
          >
            <Link href='/customers/new'>
              <PlusCircle className='size-4' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Add Customer</span>
            </Link>
          </Button>
        </CardTitle>
        <CardDescription>Update, delete and edit your customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            <Input
              placeholder='Filter Customers'
              value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
              onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className='flex items-center justify-end gap-4 pt-4'>
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              variant='outline'
            >
              <ChevronLeftIcon className='w-4 h-4' />
              <span>Previous Page</span>
            </Button>
            <Button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              variant='outline'
            >
              <span>Next page</span>
              <ChevronRightIcon className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
