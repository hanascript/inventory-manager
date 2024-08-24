'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { DollarSign } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { productSchema } from '@/schemas';
import { createProduct } from '@/actions/product/create-product';

import { Input } from '@/components/ui/input';
import { Tiptap } from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

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
      price: 0.0,
    },
  });

  const { execute, isPending, hasSucceeded, hasErrored } = useAction(createProduct, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
      router.push('/products');
    },
    onError: () => {
      toast.error('Error creating product');
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
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Saekdong Stripe'
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
              <FormLabel>Product Price</FormLabel>
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
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='draft'>Draft</SelectItem>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='archived'>Archived</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full'>Submit</Button>
      </form>
    </Form>
  );
};
