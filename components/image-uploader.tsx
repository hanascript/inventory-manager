'use client';

import { useUploadThing } from '@/lib/uploadthing';
import { useDropzone } from '@uploadthing/react';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { Input } from './ui/input';

type Props = {
  value: File[] | undefined;
};

export const ImageUploader = ({ value }: Props) => {
  const { setValue } = useFormContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue('images', acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: () => {
      alert('uploaded successfully!');
    },
    onUploadError: () => {
      alert('error occurred while uploading');
    },
    onUploadBegin: () => {
      alert('upload has begun');
    },
  });

  const fileTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div>
      
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
          <button
            type='button'
            className='flex aspect-square w-full items-center justify-center rounded-md border border-dashed'
          >
            <Upload className='h-4 w-4 text-muted-foreground' />
            <span className='sr-only'>Upload</span>
          </button>
        </div>
      </div> */}
      <div
        {...getRootProps()}
        className='relative flex flex-col items-center justify-center w-full py-6 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 '
      >
        <div className='flex flex-col items-center justify-center gap-2'>
          <Upload className='size-5 text-muted-foreground mb-2' />
          <div className='text-xs text-muted-foreground text-center'>
            <p>Click to upload files</p>
            <p>&#40;files should be under 3 MB &#41;</p>
          </div>
        </div>
      </div>
      <Input
        {...getInputProps()}
        id='dropzone-file'
        accept='image/png, image/jpeg'
        type='file'
        className='hidden'
      />
    </div>
  );
};
