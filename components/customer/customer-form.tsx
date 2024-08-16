'use client';

import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, PlusCircle } from 'lucide-react';

import { customerSchema } from '@/schemas';

import { Input } from '@/components/ui/input';
import { Tiptap } from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import { CardWrapper } from '@/components/card-wrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Customer } from '@prisma/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createCustomer } from '@/actions/customer/create-customer';
import { deleteCustomer } from '@/actions/customer/delete-customer';

type Props = {
  initialData?: Customer | null;
};

export const CustomerForm: React.FC<Props> = ({ initialData }) => {
  const router = useRouter();

  const defaultValues = initialData
    ? { ...initialData, phone: initialData?.phone || undefined }
    : { name: '', email: '', address: '', phone: undefined };

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues,
  });

  const { execute, isPending } = useAction(createCustomer, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
      router.push('/customers');
    },
    onError: () => {
      toast.error('Error creating customer');
    },
  });

  const { execute: handleDelete, isPending: isPendingDelete } = useAction(deleteCustomer, {
    onSuccess: ({ data }) => {
      toast.success(data?.success);
      router.push('/customers');
    },
    onError: () => {
      toast.error('Error deleting customer');
    },
  });

  const handleSubmit = (data: z.infer<typeof customerSchema>) => {
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
            <Link href='/customers'>
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only'>Back</span>
            </Link>
          </Button>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            Add Customer
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
              title='Customer Details'
              description='Edit the details of your customer'
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
                          placeholder='Bob Smith'
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
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className='w-full'
                          placeholder='bob@example.com'
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
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          className='w-full'
                          placeholder='123 Main Street'
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
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          className='w-full'
                          placeholder='123-456-7890'
                          autoComplete='off'
                          disabled={isPending || isPendingDelete}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardWrapper>
          </div>
        </div>
      </form>
    </Form>
  );
};
