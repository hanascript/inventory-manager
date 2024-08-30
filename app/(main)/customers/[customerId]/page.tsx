import { redirect } from 'next/navigation';

import { CustomerForm } from '@/components/customer/customer-form';
import db from '@/lib/db';

export default async function CustomerFormPage({ params }: { params: { customerId: string } }) {
  if (!params.customerId) redirect('/customers');

  if (params.customerId === 'new') {
    return <CustomerForm />;
  }

  const customer = await db.customer.findUnique({
    where: {
      id: params.customerId,
    },
  });

  return <CustomerForm initialData={customer} />;
}
