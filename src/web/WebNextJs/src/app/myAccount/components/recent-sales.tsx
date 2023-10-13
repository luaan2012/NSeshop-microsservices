'use client'

import { OrderFinished } from "@/types"
import { formatToCurrency } from "@/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

interface RecentSalesProps {
  orders: OrderFinished[]
}
  
export function RecentSales({orders}: RecentSalesProps) {
  return (
    <div className="space-y-8">
      {orders?.map((order, key) => (
        <div key={key} className="flex items-center">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Pedido #{order.code}</p>
            {order?.orderItems.map((item, key) => (
              <div className="flex gap-1" key={key}>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`/images/${item.image}`} alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <p key={key} className="text-sm text-muted-foreground">{item.name}</p>
              </div>
            ))}
          </div>
          <div className="ml-auto font-medium">{formatToCurrency(order.valuetotal)}</div>
        </div>
      ))}
    </div>
  )
}