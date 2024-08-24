import Link from 'next/link';
import { Activity, ArrowUpRight, CreditCard, DollarSign, TableCellsSplit, Users } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getGraphRevenue } from '@/actions/get-graph-revenue';
import { CardWrapper } from '@/components/card-wrapper';

export default async function Home() {
  const graphData = await getGraphRevenue();

  return (
    <div className='p-4'>
      <div className='grid gap-4 md:grid-cols-3 mb-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$45,231.89</div>
            <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$45,231.89</div>
            <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Sales</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+12,234</div>
            <p className='text-xs text-muted-foreground'>+19% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='md:col-span-2'>
          <CardHeader className='flex flex-row items-center'>
            <div className='grid gap-2'>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Recent transactions from your store.</CardDescription>
            </div>
            <Button
              asChild
              size='sm'
              className='ml-auto gap-1'
            >
              <Link href='#'>
                View All
                <ArrowUpRight className='h-4 w-4' />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className='font-medium'>Liam Johnson</div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>liam@example.com</div>
                  </TableCell>
                  <TableCell>Sale</TableCell>
                  <TableCell className='text-right'>$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className='font-medium'>Olivia Smith</div>
                    <div>olivia@example.com</div>
                  </TableCell>
                  <TableCell>Refund</TableCell>
                  <TableCell className='text-right'>$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-8'>
            <div className='flex items-center justify-between'>
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>Olivia Martin</p>
                <p className='text-sm text-muted-foreground'>olivia.martin@email.com</p>
              </div>
              <div className='font-medium'>pending</div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>Olivia Martin</p>
                <p className='text-sm text-muted-foreground'>olivia.martin@email.com</p>
              </div>
              <div className='font-medium'>pending</div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>Olivia Martin</p>
                <p className='text-sm text-muted-foreground'>olivia.martin@email.com</p>
              </div>
              <div className='font-medium'>pending</div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>Olivia Martin</p>
                <p className='text-sm text-muted-foreground'>olivia.martin@email.com</p>
              </div>
              <div className='font-medium'>pending</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
