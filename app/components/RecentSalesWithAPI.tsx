"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import type { Sale } from "@/lib/api-types"

interface RecentSalesWithAPIProps {
  data: Sale[]
  loading: boolean
}

export function RecentSalesWithAPI({ data, loading }: RecentSalesWithAPIProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
            <div className="ml-auto">
              <Skeleton className="h-4 w-[60px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground">売上データがありません</div>
    )
  }

  return (
    <div className="space-y-4">
      {data.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{sale.customer.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">+¥{sale.amount.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
