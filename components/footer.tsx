import { CardFooter } from '@/components/ui/card';

export const Footer = () => {
  return (
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
  );
};
