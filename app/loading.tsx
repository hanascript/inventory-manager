import { Loader2 } from 'lucide-react';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className='w-full h-screen grid place-items-center'>
      <Loader2 className='animate-spin text-primary-foreground' />
    </div>
  );
}
