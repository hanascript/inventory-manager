'use client';

import Link from 'next/link';
import { z } from 'zod';
import { toast } from 'sonner';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Checkbox } from '../ui/checkbox';

type Props = {
  customers: Customer[];
  storeProducts: Product[];
};

export const OrderForm: React.FC<Props> = ({ customers, storeProducts }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      id: 'new',
      customerId: '',
      isPaid: false,
      isDelivered: false,
      products: [{ productId: '', quantity: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
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

  const handleSubmit = (data: any) => {
    // execute(data);
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='p-4 h-full'
      >
        {/* Order Items */}
        {fields.map((item, index) => (
          <div key={item.id}>
            <FormField
              control={form.control}
              name={`products[${index}].productId`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type='text'
                      placeholder='Product ID'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`products[${index}].quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      type='number'
                      placeholder='Quantity'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <button
              type='button'
              onClick={() => remove(index)}
            >
              Remove Item
            </button>
          </div>
        ))}
        {/* <div className='grid grid-cols-3 gap-4'>
          <FormField
            control={form.control}
            name='products'
            render={() => (
              <FormItem className='col-span-2'>
                <FormLabel className='text-base'>Sidebar</FormLabel>
                {storeProducts.map(product => (
                  <FormField
                    key={product.id}
                    control={form.control}
                    name='products'
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={product.id}
                          className='flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-full'
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.some(product => product.id === product.id)}
                              onCheckedChange={checked => {
                                return checked
                                  ? field.onChange([...field.value, product])
                                  : field.onChange(field.value?.filter(value => value.id !== product.id));
                              }}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>{product.name}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
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
          <Button className='col-span-3'>Submit</Button>
        </div> */}
        {/* 

        <FormField
          control={form.control}
          name='products'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>Sidebar</FormLabel>
              </div>

              {products.map(product => (
                <FormField
                  key={product.id}
                  control={form.control}
                  name='products'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={product.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.some(product => product.id === product.id)}
                            onCheckedChange={checked => {
                              return checked
                                ? field.onChange([...field.value, product])
                                : field.onChange(field.value?.filter(value => value.id !== product.id));
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>{product.name}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
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
        <Button className='w-full'>Submit</Button> */}
      </form>
    </Form>
  );
};
