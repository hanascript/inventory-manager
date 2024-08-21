import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className='flex-1 border-none rounded-none md:rounded-2xl shadow-md flex flex-col'>
      <CardHeader className='p-3 px-6 bg-muted/80 rounded-none md:rounded-t-2xl flex flex-row justify-between items-center border-b'>
        <div>
          <CardTitle className='text-lg'>Dashboard</CardTitle>
          <CardDescription className='text-xs'>breadbrumbs</CardDescription>
        </div>
        <Button
          size='sm'
          className='text-sm gap-1'
        >
          <Plus className='size-3' /> Create
        </Button>
      </CardHeader>
      <CardContent className='p-0 flex-1'>{children}</CardContent>
      <CardFooter className='mt-auto border-t text-xs text-muted-foreground bg-muted/80 flex justify-between items-center rounded-none md:rounded-b-2xl px-6 py-4'>
        <div>
          Developed by{' '}
          <a
            href='https://github.com/hanascript'
            target='_blank'
            className='text-foreground'
          >
            Nathan Marcellous
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};
