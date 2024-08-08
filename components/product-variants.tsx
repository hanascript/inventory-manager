'use client';

import { z } from 'zod';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { productSchema } from '@/schemas';
import { CardWrapper } from './card-wrapper';
import { FormField, FormItem, FormControl } from './ui/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';

export const ProductVariants = () => {
  const { getValues, control, setError } = useFormContext<z.infer<typeof productSchema>>();

  const { fields, remove, append, update, move } = useFieldArray({
    control,
    name: 'variants',
  });

  const handleAddVariant = () => {
    append({
      price: 15,
      stock: 25,
      color: '#000000',
      size: 's',
    });
  };

  return (
    <CardWrapper
      title='Variants'
      description='Edit your product variants'
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Color</TableHead>
            <TableHead className='w-[100px]'>Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                <FormField
                  control={control}
                  name={`variants.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='0.00'
                          type='number'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={control}
                  name={`variants.${index}.stock`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='0'
                          type='number'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={control}
                  name={`variants.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        {/* <div className='relative'> */}
                        <Input
                          placeholder='Color value'
                          className='border p-2 rounded-full'
                          type='color'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={control}
                  name={`variants.${index}.size`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ToggleGroup
                          type='single'
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          variant='outline'
                        >
                          <ToggleGroupItem value='s'>S</ToggleGroupItem>
                          <ToggleGroupItem value='m'>M</ToggleGroupItem>
                          <ToggleGroupItem value='l'>L</ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex items-center justify-center border-t p-4'>
        <Button
          size='sm'
          variant='ghost'
          className='gap-1'
          type='button'
          onClick={handleAddVariant}
        >
          <PlusCircle className='h-3.5 w-3.5' />
          Add Variant
        </Button>
      </div>
    </CardWrapper>
  );
};
