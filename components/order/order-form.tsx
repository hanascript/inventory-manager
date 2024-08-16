'use client';

import Link from 'next/link';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Customer, Order, Product } from '@prisma/client';
import { Check, ChevronLeft, ChevronsUpDown, PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { orderSchema } from '@/schemas';
import { createOrder } from '@/actions/order/create-order';
import { deleteOrder } from '@/actions/order/delete-order';

import { Button } from '@/components/ui/button';
import { CardWrapper } from '@/components/card-wrapper';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

import { OrderProducts } from './order-products';
import { OrderQuantity } from './order-quantity';

type Props = {
  initialData?: (Order & { products: Product[] }) | null;
  customers: Customer[];
  products: Product[];
};

export const OrderForm: React.FC<Props> = ({ initialData, customers, products }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialData || {
      customerId: '',
      quantity: 1,
      status: 'pending',
      products: [],
    },
  });

  const { execute, isPending } = useAction(createOrder, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
      router.push('/orders');
    },
    onError: () => {
      toast.error('Error creating order');
    },
  });

  const { execute: handleDelete, isPending: isPendingDelete } = useAction(deleteOrder, {
    onSuccess: () => {
      toast.success('Order deleted successfully');
      router.push('/orders');
    },
    onError: () => {
      toast.error('Error deleting order');
    },
  });

  const handleSubmit = (data: any) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='grid auto-rows-max gap-4'
      >
        <div className='flex items-center gap-4'>
          <Button
            variant='outline'
            size='icon'
            className='h-7 w-7'
            type='button'
            asChild
          >
            <Link href='/orders'>
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only'>Back</span>
            </Link>
          </Button>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            Create Order
          </h1>

          <div className='hidden items-center gap-2 md:ml-auto md:flex'>
            {initialData && (
              <Button
                variant='outline'
                size='sm'
                type='button'
                onClick={() => {
                  handleDelete({ id: initialData.id });
                }}
              >
                Discard
              </Button>
            )}
            <Button
              size='sm'
              className='flex gap-2'
              type='submit'
              disabled={isPending || isPendingDelete}
            >
              <PlusCircle className='size-4' />
              Save
            </Button>
          </div>
        </div>
        <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
            <CardWrapper
              title='Order Details'
              description='Edit the details of the order'
            >
              <div className='grid gap-6'>
                <FormField
                  control={form.control}
                  name='customerId'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Customer</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant='outline'
                              role='combobox'
                              className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                            >
                              {field.value
                                ? customers.find(customers => customers.id === field.value)?.name
                                : 'Select a customer'}
                              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-[200px] p-0'>
                          <Command>
                            <CommandInput placeholder='Search your customers...' />
                            <CommandList>
                              <CommandEmpty>No customer found.</CommandEmpty>
                              <CommandGroup>
                                {customers.map(customers => (
                                  <CommandItem
                                    value={customers.name}
                                    key={customers.id}
                                    onSelect={() => {
                                      form.setValue('customerId', customers.id);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        'mr-2 h-4 w-4',
                                        customers.id === field.value ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                    {customers.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardWrapper>
            <FormField
              control={form.control}
              name='products'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <OrderProducts
                      cart={field.value}
                      products={products}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <OrderQuantity />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
