'use client';

import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ImageIcon, Paperclip, PlusCircle, Upload } from 'lucide-react';

import { productSchema } from '@/schemas';
import { createProduct } from '@/actions/create-product';

import { Input } from '@/components/ui/input';
import { Tiptap } from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import { CardWrapper } from '@/components/card-wrapper';
import { ImageUploader } from '@/components/image-uploader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { ProductVariants } from './product-variants';

export const AddProductForm = () => {
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'draft',
      category: '',
      price: 0.0,
      variants: [
        {
          stock: 25,
          color: '#000000',
          size: 's',
        },
      ],
      // image: undefined,
    },
  });

  // const fileRef = form.register('image');

  const handleSubmit = (data: z.infer<typeof productSchema>) => {
    createProduct(data).then(res => {
      if (res.error) {
        alert(res.error);
      } else {
        alert(res.success);
      }
    });
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
            {/* <Button
              variant='outline'
              size='sm'
              type='button'
            >
              Discard
            </Button> */}
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
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder='25.00'
                          type='number'
                          min='1'
                          step='0.01'
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
            <ProductVariants />
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
                <CardDescription>Max images: 3.</CardDescription>
                <CardDescription>Max file size: 3MB.</CardDescription>
              </CardHeader>
              <CardContent>
                Sign in to upload your product images
                {/* <div>
                  {selectedImage ? (
                    <div className='md:max-w-[200px]'>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt='Selected'
                      />
                    </div>
                  ) : (
                    <div className='inline-flex items-center justify-between'>
                      <div className='p-3 bg-slate-200  justify-center items-center flex'>
                        <ImageIcon />
                      </div>
                    </div>
                  )}
                </div> */}
                {/* <FormField
                  control={form.control}
                  name='image'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Button
                          size='lg'
                          type='button'
                        >
                          <input
                            type='file'
                            className='hidden'
                            id='fileInput'
                            accept='image/*'
                            onBlur={field.onBlur}
                            name={field.name}
                            onChange={e => {
                              field.onChange(e.target.files);
                              setSelectedImage(e.target.files?.[0] || null);
                            }}
                            ref={field.ref}
                          />
                          <label
                            htmlFor='fileInput'
                            className='bg-blue-500 hover:bg-blue-600 text-neutral-90  rounded-md cursor-pointer inline-flex items-center'
                          >
                            <Paperclip />
                            <span className='whitespace-nowrap'>choose your image</span>
                          </label>
                        </Button>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {/* <div className='grid gap-2'>
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
                </div> */}
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>Remove this product from the store and make it unavailable for sale.</CardDescription>
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
            </Card> */}
          </div>
        </div>
        {/* <div className='flex items-center justify-center gap-2 md:hidden'>
          <Button
            variant='outline'
            size='sm'
          >
            Discard
          </Button>
          <Button size='sm'>Save Product</Button>
        </div> */}
      </form>
    </Form>
  );
};
