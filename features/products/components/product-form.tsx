import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@prisma/client';
import { DollarSign, HashIcon, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { productSchema } from '@/features/products/types';

import { Tiptap } from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormValues = z.input<typeof productSchema>;

type Props = {
  id?: string;
  initialData?: Product | null;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled: boolean;
};

export const ProductForm: React.FC<Props> = ({ id, initialData, onSubmit, onDelete, disabled }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      id: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      isActive: false,
      isArchived: false,
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Saekdong Stripe'
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex items-center justify-between gap-4'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-2'>
                    <DollarSign
                      size={36}
                      className='p-2 bg-muted  rounded-md'
                    />
                    <Input
                      {...field}
                      type='currency'
                      placeholder='Your price in USD'
                      disabled={disabled}
                      step='0.1'
                      min={0}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='stock'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-2'>
                    <HashIcon
                      size={36}
                      className='p-2 bg-muted  rounded-md'
                    />
                    <Input
                      placeholder='0'
                      type='number'
                      step={1}
                      disabled={disabled}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Tiptap
                  value={field.value}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          <FormField
            control={form.control}
            name='isActive'
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
                  <FormLabel>Is Active</FormLabel>
                  <FormDescription>Setting this product as active will make it visible in the store.</FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isArchived'
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
                  <FormLabel>Is Archived</FormLabel>
                  <FormDescription>Archive this product. It will no longer be visible in the store.</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button
          className='w-full'
          disabled={disabled}
        >
          {id ? 'Save changes' : 'Create product'}
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
            Delete Product
          </Button>
        )}
      </form>
    </Form>
  );
};
