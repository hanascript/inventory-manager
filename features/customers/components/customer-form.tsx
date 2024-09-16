import { zodResolver } from '@hookform/resolvers/zod';
import { Customer } from '@prisma/client';
import { DollarSign, HashIcon, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { customerSchema } from '@/features/customers/types';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormValues = z.input<typeof customerSchema>;

type Props = {
  id?: string;
  initialData?: Customer | null;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled: boolean;
};

export const CustomerForm: React.FC<Props> = ({ id, initialData, onSubmit, onDelete, disabled }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: initialData || {
      id: '',
      name: '',
      email: '',
      address: '',
      phone: '',
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
                  className='w-full'
                  placeholder='Bob Smith'
                  autoComplete='off'
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
      </form>
    </Form>
  );
};
