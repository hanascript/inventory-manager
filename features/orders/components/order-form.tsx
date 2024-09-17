import { zodResolver } from '@hookform/resolvers/zod';
import { Customer, Order, OrderItem, Product } from '@prisma/client';
import { Check, ChevronsUpDown, DollarSign, HashIcon, Minus, Plus, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { orderSchema } from '@/features/orders/types';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type FormValues = z.input<typeof orderSchema>;

type Props = {
  id?: string;
  customers: Customer[];
  products: Product[];
  initialData?: (Order & { OrderItem: OrderItem[] }) | null;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled: boolean;
};

export const OrderForm: React.FC<Props> = ({ id, customers, products, initialData, onSubmit, onDelete, disabled }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialData || {
      id: '',
      customerId: '',
      isPaid: false,
      isDelivered: false,
      OrderItem: [],
    },
  });

  const handleSubmit = (data: FormValues) => {
    onSubmit(data);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='p-4 space-y-4 h-full'
      >
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
                      className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                    >
                      {field.value
                        ? customers.find(customers => customers.id === field.value)?.name
                        : 'Select a customer'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0'>
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
                              className={cn('mr-2 h-4 w-4', customers.id === field.value ? 'opacity-100' : 'opacity-0')}
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
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <FormField
            control={form.control}
            name='isPaid'
            render={({ field }) => (
              <FormItem className='flex items-start space-x-3 space-y-0 rounded-md border p-4 w-full'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Is Paid</FormLabel>
                  <FormDescription>
                    Settings this order as paid will add its amount to the total revenue.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isDelivered'
            render={({ field }) => (
              <FormItem className='flex items-start space-x-3 space-y-0 rounded-md border p-4 w-full'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Is Delivered</FormLabel>
                  <FormDescription>
                    Settings this order as delievered will remove it from the active order list.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='OrderItem'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>Products</FormLabel>
              </div>

              {products.map(product => (
                <FormField
                  key={product.id}
                  control={form.control}
                  name='OrderItem'
                  render={({ field }) => {
                    const existingProduct = field.value?.find(value => value.productId === product.id);

                    return (
                      <FormItem
                        key={product.id}
                        className='flex flex-row items-start space-x-3 space-y-0 border p-2 rounded-md'
                      >
                        <FormControl>
                          <div className='flex items-center justify-between p-2 w-full'>
                            <div className='flex items-center gap-3'>
                              <Checkbox
                                checked={Boolean(existingProduct)}
                                disabled={disabled || product.stock == 0}
                                onCheckedChange={checked => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        { id: 'new', orderId: 'new', productId: product.id, quantity: 1 },
                                      ])
                                    : field.onChange(field.value?.filter(value => value.productId !== product.id));
                                }}
                              />
                              <div>
                                <p>{product.name}</p>
                                <p className='text-xs text-muted-foreground'>${product.price}</p>
                              </div>
                            </div>

                            <div className='flex items-center gap-3'>
                              {existingProduct && (
                                <div className='flex items-center gap-2'>
                                  <Button
                                    variant='outline'
                                    className='h-8'
                                    size='icon'
                                    type='button'
                                    disabled={disabled || product.stock == 0}
                                    onClick={() => {
                                      if (existingProduct) {
                                        // Update quantity, if quantity != 1, then remove the product
                                        field.onChange(
                                          field.value.map(value => {
                                            if (value.productId === product.id) {
                                              if (value.quantity === 1) {
                                                return value;
                                              }
                                              return { ...value, quantity: value?.quantity - 1 };
                                            }
                                            return value;
                                          })
                                        );
                                      }
                                    }}
                                  >
                                    <Minus className='size-4' />
                                  </Button>
                                  {existingProduct.quantity}
                                  <Button
                                    variant='outline'
                                    className='h-8'
                                    size='icon'
                                    type='button'
                                    disabled={disabled || product.stock == 0}
                                    onClick={() => {
                                      if (existingProduct) {
                                        // Update quantity, if quantity != product.stock, then add the product
                                        field.onChange(
                                          field.value.map(value => {
                                            if (value.productId === product.id) {
                                              if (value.quantity === product.stock) {
                                                return value;
                                              }
                                              return { ...value, quantity: value?.quantity + 1 };
                                            }
                                            return value;
                                          })
                                        );
                                      }
                                    }}
                                  >
                                    <Plus className='size-4' />
                                  </Button>
                                </div>
                              )}
                              <p className='text-xs text-muted-foreground'>Avaliable stock: {product.stock}</p>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </FormItem>
          )}
        />
        <div className='pb-6'>
          <Button
            className='w-full'
            disabled={disabled}
          >
            {id ? 'Save changes' : 'Create customer'}
          </Button>
          {!!id && (
            <Button
              type='button'
              disabled={disabled}
              onClick={handleDelete}
              className='w-full'
              variant='outline'
            >
              <Trash className='size-4 mr-2' />
              Delete Customer
            </Button>
        )}
        </div>
      </form>
    </Form>
  );
};
