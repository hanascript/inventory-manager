import { columns, DataTable, payments } from '@/components/data-table';
import { Navbar } from '@/components/navbar/navbar2';
import { PageWrapper } from '@/components/page-wrapper';
import { ColumnDef } from '@tanstack/react-table';

export default function TestPage() {
  return (
    <div className='md:px-2 h-full flex flex-col md:gap-4'>
      <Navbar />
      <PageWrapper>
        <DataTable
          filter='email'
          columns={columns}
          data={payments}
        />
      </PageWrapper>
    </div>
  );
}
