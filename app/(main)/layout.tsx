import { Navbar } from '@/components/navbar/navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='p-4 md:p-8'>{children}</main>
    </>
  );
}
