'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { DollarSign, HashIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { productSchema } from '@/schemas';
import { createProduct } from '@/actions/product/create-product';

import { Input } from '@/components/ui/input';
import { Tiptap } from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type Props = {
  initialData?: Product | null;
};

export const ProductForm: React.FC<Props> = ({ initialData }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      id: 'new',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      isActive: false,
      isArchived: false,
    },
  });

  const { execute, isPending } = useAction(createProduct, {
    onSuccess: ({ data }) => {
      console.log(data);
      toast.success('success');
      router.push('/products');
    },
    onError: () => {
      toast.error('An error has occurred.');
    },
  });

  const handleSubmit = (data: z.infer<typeof productSchema>) => {
    execute(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='p-4 space-y-4 h-full'
      >
        {/* <UploadDropzone endpoint='imageUploader' /> */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Saekdong Stripe'
                  disabled={isPending}
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
                      disabled={isPending}
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
                      disabled={isPending}
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
                  disabled={isPending}
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
                    disabled={isPending}
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
                    disabled={isPending}
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
        <Button className='w-full'>Submit</Button>
      </form>
    </Form>
  );
};
