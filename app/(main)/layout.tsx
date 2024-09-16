import { Navbar } from '@/components/navbar/navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col md:gap-4 h-full'>
      <Navbar />
      {children}
    </div>
  );
}
