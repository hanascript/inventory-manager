'use client';

import { z } from 'zod';
import { PlusCircle, Trash } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { productSchema } from '@/schemas';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardWrapper } from '@/components/card-wrapper';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const ProductVariants = () => {
  const { getValues, control, setError } = useFormContext<z.infer<typeof productSchema>>();

  const { fields, remove, append, update, move } = useFieldArray({
    control,
    name: 'variants',
  });

  const handleAddVariant = () => {
    append({
      stock: 0,
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
            <TableHead>Stock</TableHead>
            <TableHead className='w-[50px]'>Color</TableHead>
            <TableHead>Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((item, index) => (
            <TableRow key={item.id}>
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
                          step='1'
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
                          className='mr-auto'
                        >
                          <ToggleGroupItem value='s'>S</ToggleGroupItem>
                          <ToggleGroupItem value='m'>M</ToggleGroupItem>
                          <ToggleGroupItem value='l'>L</ToggleGroupItem>
                          <ToggleGroupItem value='xl'>XL</ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <Button
                  size='icon'
                  type='button'
                  onClick={() => remove(index)}
                >
                  <Trash className='size-4' />
                </Button>
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
