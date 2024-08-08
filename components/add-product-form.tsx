'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, PlusCircle, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Input } from '@/components/ui/input';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


import { useForm } from 'react-hook-form';
import { productSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tiptap } from './tiptap';
import { CardWrapper } from './card-wrapper';
import { ProductVariants } from './product-variants';

export const AddProductForm = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'draft',
      category: '',
      variants: [
        {
          price: 15,
          stock: 25,
          color: '#000000',
          size: 's',
        },
      ],
    },
  });

  const handleSubmit = (data: any) => {
    console.log(data);
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
            <Link href='/products'>
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only'>Back</span>
            </Link>
          </Button>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            Add Product
          </h1>

          <div className='hidden items-center gap-2 md:ml-auto md:flex'>
            <Button
              variant='outline'
              size='sm'
              type='button'
            >
              Discard
            </Button>
            <Button
              size='sm'
              className='flex gap-2'
              type='submit'
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
                          {...field}
                        />
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
              </div>
            </CardWrapper>
            <ProductVariants />
            {/* <Card>
              <CardHeader>
                <CardTitle>Variants</CardTitle>
                <CardDescription>Edit your product variants</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[100px]'>SKU</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className='w-[100px]'>Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='font-semibold'>GGPC-001</TableCell>
                      <TableCell>
                        <Label
                          htmlFor='stock-1'
                          className='sr-only'
                        >
                          Stock
                        </Label>
                        <Input
                          id='stock-1'
                          type='number'
                          defaultValue='100'
                        />
                      </TableCell>
                      <TableCell>
                        <Label
                          htmlFor='price-1'
                          className='sr-only'
                        >
                          Price
                        </Label>
                        <Input
                          id='price-1'
                          type='number'
                          defaultValue='99.99'
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type='single'
                          defaultValue='s'
                          variant='outline'
                        >
                          <ToggleGroupItem value='s'>S</ToggleGroupItem>
                          <ToggleGroupItem value='m'>M</ToggleGroupItem>
                          <ToggleGroupItem value='l'>L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-semibold'>GGPC-002</TableCell>
                      <TableCell>
                        <Label
                          htmlFor='stock-2'
                          className='sr-only'
                        >
                          Stock
                        </Label>
                        <Input
                          id='stock-2'
                          type='number'
                          defaultValue='143'
                        />
                      </TableCell>
                      <TableCell>
                        <Label
                          htmlFor='price-2'
                          className='sr-only'
                        >
                          Price
                        </Label>
                        <Input
                          id='price-2'
                          type='number'
                          defaultValue='99.99'
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type='single'
                          defaultValue='m'
                          variant='outline'
                        >
                          <ToggleGroupItem value='s'>S</ToggleGroupItem>
                          <ToggleGroupItem value='m'>M</ToggleGroupItem>
                          <ToggleGroupItem value='l'>L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='font-semibold'>GGPC-003</TableCell>
                      <TableCell>
                        <Label
                          htmlFor='stock-3'
                          className='sr-only'
                        >
                          Stock
                        </Label>
                        <Input
                          id='stock-3'
                          type='number'
                          defaultValue='32'
                        />
                      </TableCell>
                      <TableCell>
                        <Label
                          htmlFor='price-3'
                          className='sr-only'
                        >
                          Stock
                        </Label>
                        <Input
                          id='price-3'
                          type='number'
                          defaultValue='99.99'
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup
                          type='single'
                          defaultValue='s'
                          variant='outline'
                        >
                          <ToggleGroupItem value='s'>S</ToggleGroupItem>
                          <ToggleGroupItem value='m'>M</ToggleGroupItem>
                          <ToggleGroupItem value='l'>L</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className='justify-center border-t p-4'>
                <Button
                  size='sm'
                  variant='ghost'
                  className='gap-1'
                >
                  <PlusCircle className='h-3.5 w-3.5' />
                  Add Variant
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6 sm:grid-cols-3'>
                  <div className='grid gap-3'>
                    <Label htmlFor='category'>Category</Label>
                    <Select>
                      <SelectTrigger
                        id='category'
                        aria-label='Select category'
                      >
                        <SelectValue placeholder='Select category' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='clothing'>Clothing</SelectItem>
                        <SelectItem value='electronics'>Electronics</SelectItem>
                        <SelectItem value='accessories'>Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='subcategory'>Subcategory (optional)</Label>
                    <Select>
                      <SelectTrigger
                        id='subcategory'
                        aria-label='Select subcategory'
                      >
                        <SelectValue placeholder='Select subcategory' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='t-shirts'>T-Shirts</SelectItem>
                        <SelectItem value='hoodies'>Hoodies</SelectItem>
                        <SelectItem value='sweatshirts'>Sweatshirts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
          <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
            <CardWrapper title='Product Status'>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
            <Card className='overflow-hidden'>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-2'>
                  <Image
                    alt='Product image'
                    className='aspect-square w-full rounded-md object-cover'
                    height='300'
                    src='/placeholder_small.png'
                    width='300'
                    priority
                  />
                  <div className='grid grid-cols-3 gap-2'>
                    <button>
                      <Image
                        alt='Product image'
                        className='aspect-square w-full rounded-md object-cover'
                        height='84'
                        src='/placeholder_small.png'
                        width='84'
                        priority={false}
                      />
                    </button>
                    <button>
                      <Image
                        alt='Product image'
                        className='aspect-square w-full rounded-md object-cover'
                        height='84'
                        src='/placeholder_small.png'
                        width='84'
                        priority={false}
                      />
                    </button>
                    <button className='flex aspect-square w-full items-center justify-center rounded-md border border-dashed'>
                      <Upload className='h-4 w-4 text-muted-foreground' />
                      <span className='sr-only'>Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>Lipsum dolor sit amet, consectetur adipiscing elit.</CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button
                  size='sm'
                  variant='secondary'
                >
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 md:hidden'>
          <Button
            variant='outline'
            size='sm'
          >
            Discard
          </Button>
          <Button size='sm'>Save Product</Button>
        </div>
      </form>
    </Form>
  );
};
