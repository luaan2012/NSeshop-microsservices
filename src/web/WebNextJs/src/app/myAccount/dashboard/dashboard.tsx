'use client'

import { Metadata } from "next"
import { CalendarDateRangePicker } from "../components/date-range.picker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "../components/overview"
import { RecentSales } from "../components/recent-sales"
import { OrderContext } from "@/contexts/OrderContext"
import { useContext, useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import { current } from "@reduxjs/toolkit"
import { formatToCurrency } from "@/utils"
import { OrderFinished } from "@/types"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

export default function DashboardPage() {
    const { orders, data, getAllOrdersApi } = useContext(OrderContext);
    const currentYear = new Date().getFullYear();
    const [date, setDate] = useState<DateRange | undefined>({
      from: new Date(currentYear, 0, 1), 
      to: new Date(currentYear, 11, 1),
    });   
        
    const filteredOrders = orders.filter(order => {
    if (date && date.from && date.to) {
        const orderDate = new Date(order.data);
        const fromDate = new Date(date.from);
        const toDate = new Date(date.to);
    
        orderDate.setHours(0, 0, 0, 0);
        fromDate.setHours(0, 0, 0, 0);
        toDate.setHours(0, 0, 0, 0);
    
        return orderDate >= fromDate && orderDate <= toDate;
    }
    return true;
    });

    function calculateAverageOrderValue(orders: OrderFinished[]) {
        if (orders.length === 0) {
          return 0; // Retorna 0 se a lista de pedidos estiver vazia
        }
      
        // Soma o valor total de todos os pedidos
        const totalValue = orders.reduce((sum, order) => sum + order.valuetotal, 0);
      
        // Calcula a média dividindo pelo número de pedidos
        const averageValue = totalValue / orders.length;
        return averageValue;
      }
    
    
  useEffect(() => {
    if (data && orders.length === 0) getAllOrdersApi();
  }, [data]);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker date={date} setDate={setDate}/>
            </div>
          </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Total Gastos
                </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{formatToCurrency(filteredOrders?.reduce((value, current) => value + current.valuetotal, 0))}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Total Descontos
                </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{formatToCurrency(filteredOrders?.reduce((value, current) => value + current.discount, 0))}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Média Compras</CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                </svg>
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{formatToCurrency(filteredOrders?.reduce((sum, order) => sum + order.valuetotal, 0) / filteredOrders.length)}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Vouches Usados
                </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{filteredOrders.reduce((sum, order) => sum + (order.voucherUsed ? 1 : 0), 0)}</div>
                </CardContent>
            </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                <Overview orders={filteredOrders}/>
                </CardContent>
            </Card>
            <Card className="col-span-3">
                <CardHeader>
                <CardTitle>Compras</CardTitle>
                <CardDescription>
                    Você realizou {filteredOrders.length} compras nesse período.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <RecentSales orders={filteredOrders}/>
                </CardContent>
            </Card>
            </div>
        </div>
      </div>
    </>
  )
}