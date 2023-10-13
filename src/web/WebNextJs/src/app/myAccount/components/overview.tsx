"use client"

import { OrderFinished } from "@/types"
import { addMonths, format } from "date-fns"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface RecentSalesProps {
  orders: OrderFinished[]
}
  
export function Overview({orders}: RecentSalesProps) {

  const allMonths = [];
  let currentDate = new Date(2023, 0);
  while (currentDate.getMonth() < 11) {
    allMonths.push({
      name: format(currentDate, 'MMM'),
      total: 0,
    });
    currentDate = addMonths(currentDate, 1);
  }

  for (const order of orders) {
    const monthIndex = new Date(order.data).getMonth();
    allMonths[monthIndex].total += order.valuetotal;
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={allMonths}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}