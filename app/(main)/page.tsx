import { DollarSign, Package, ShoppingBag } from 'lucide-react';

import { getGraphRevenue } from '@/actions/get-graph-revenue';
import { getRecentOrders } from '@/actions/get-recent-orders';
import { getSalesCount } from '@/actions/get-sales-count';
import { getStockCount } from '@/actions/get-stock-count';

import { getTotalRevenue } from '@/actions/get-total-revenue';
import { Analytics } from '@/components/analytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Home() {
  const graphData = await getGraphRevenue();

  const totalRevenue = await getTotalRevenue();
  const stockCount = await getStockCount();
  const salesCount = await getSalesCount();
  const recentOrders = await getRecentOrders();

  return (
    <div className='p-4'>
      <div className='grid gap-4 md:grid-cols-3 mb-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalRevenue}</div>
            <p className='text-xs text-muted-foreground'>Orders marked as paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Unique Products</CardTitle>
            <ShoppingBag className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stockCount}</div>
            <p className='text-xs text-muted-foreground'>Products marked as active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Completed Orders</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{salesCount}</div>
            <p className='text-xs text-muted-foreground'>Orders marked as paid and delivered</p>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Transactions tracked monthly.</CardDescription>
          </CardHeader>
          <CardContent>
            <Analytics data={graphData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-8'>
            {recentOrders.map(order => (
              <div
                className='flex items-center justify-between'
                key={order.id}
              >
                <div className='grid gap-1'>
                  <p className='text-sm font-medium leading-none'>{order.customer.name}</p>
                  <p className='text-sm text-muted-foreground'>{order.customer.email}</p>
                </div>
                <div className='font-medium'>{order.isPaid ? 'Paid' : 'Pending'}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
