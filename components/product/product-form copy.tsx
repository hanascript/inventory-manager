'use client';

import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, PlusCircle } from 'lucide-react';

import { productSchema } from '@/schemas';

import { Input } from '@/components/ui/input';
import { Tiptap } from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import { CardWrapper } from '@/components/card-wrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Product } from '@prisma/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/actions/product/create-product';
import { deleteProduct } from '@/actions/product/delete-product';

type Props = {
  initialData?: Product | null;
};

export const ProductForm: React.FC<Props> = ({ initialData }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      status: 'draft',
      price: 0,
    },
  });

  const { execute, isPending } = useAction(createProduct, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
      router.push('/products');
    },
    onError: () => {
      toast.error('Error creating product');
    },
  });

  const { execute: handleDelete, isPending: isPendingDelete } = useAction(deleteProduct, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
      router.push('/products');
    },
    onError: () => {
      toast.error('Error deleting product');
    },
  });

  const handleSubmit = (data: z.infer<typeof productSchema>) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='grid auto-rows-max gap-4'
      >
        <div className='flex items-center gap-4'>
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
              title='Product Details'
              description='Edit the details of your product'
            >
              <div className='grid gap-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className='w-full'
                          placeholder='Gamer Gear Pro Controller'
                          autoComplete='off'
                          disabled={isPending || isPendingDelete}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='25.00'
                          type='number'
                          min='0.01'
                          step='0.01'
                          disabled={isPending || isPendingDelete}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Tiptap value={field.value} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardWrapper>
            {/* <ProductVariants /> */}
          </div>
          <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
            <CardWrapper title='Product Status'>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending || isPendingDelete}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='draft'>Draft</SelectItem>
                        <SelectItem value='active'>Active</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardWrapper>
          </div>
        </div>
      </form>
    </Form>
  );
};
