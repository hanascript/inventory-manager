'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { customerSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { createCustomer } from '@/actions/customer/create-customer';
import { Customer } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = {
  initialData?: Customer | null;
};

export const CustomerForm: React.FC<Props> = ({ initialData }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialData || {
      id: 'new',
      name: '',
      email: '',
      address: '',
      phone: '',
    },
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

  const handleSubmit = (data: z.infer<typeof customerSchema>) => {
    execute(data);
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
                  className='w-full'
                  placeholder='Bob Smith'
                  autoComplete='off'
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full'>Submit</Button>
      </form>
    </Form>
  );
};
