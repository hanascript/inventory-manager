import { getCustomers } from '@/features/customers/actions/get-customers';
import { CustomerClient } from '@/features/customers/components/customer-client';

export default async function CustomersPage() {
  const customersQuery = await getCustomers();

  const customers = customersQuery || [];

  return <CustomerClient customers={customers} />;
}
