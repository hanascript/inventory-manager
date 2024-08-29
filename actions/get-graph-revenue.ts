'use server';

import db from '@/lib/db';

type GraphData = {
  month: string;
  total: number;
};

export const getGraphRevenue = async (): Promise<GraphData[]> => {
  const paidOrders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    include: {
      OrderItem: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  // Grouping the orders by month and summing the revenue
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
    let revenueForOrder = 0;

    for (const product of order.OrderItem) {
      revenueForOrder = revenueForOrder + product.product.price * product.quantity;
    }

    // Adding the revenue for this order to the respective month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { month: 'Jan', total: 0 },
    { month: 'Feb', total: 0 },
    { month: 'Mar', total: 0 },
    { month: 'Apr', total: 0 },
    { month: 'May', total: 0 },
    { month: 'Jun', total: 0 },
    { month: 'Jul', total: 0 },
    { month: 'Aug', total: 0 },
    { month: 'Sep', total: 0 },
    { month: 'Oct', total: 0 },
    { month: 'Nov', total: 0 },
    { month: 'Dec', total: 0 },
  ];

  // Filling in the revenue data
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};
