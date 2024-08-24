import { Navbar } from '@/components/navbar/navbar';
import { PageWrapper } from '@/components/page-wrapper';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='md:px-2 flex flex-col md:gap-4 h-full'>
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
    </div>
  );
}
