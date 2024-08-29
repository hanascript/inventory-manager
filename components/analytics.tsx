'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { CreditCard } from 'lucide-react';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

const chartConfig = {
  total: {
    label: 'Sales',
    color: '#60a5fa',
    icon: CreditCard,
  },
} satisfies ChartConfig;

type Props = {
  data: {
    month: string;
    total: number;
  }[];
};

export const Analytics = ({ data }: Props) => {
  return (
    <ChartContainer
      config={chartConfig}
      className='min-h-[100px] w-full'
    >
      <BarChart
        accessibilityLayer
        data={data}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey='desktop'
          fill='var(--color-desktop)'
          radius={4}
        />
        <Bar
          dataKey='mobile'
          fill='var(--color-mobile)'
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
};
