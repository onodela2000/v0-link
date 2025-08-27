'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboardData } from "@/hooks/use-dashboard-data"

export default function RecentSalesWithAPI() {
  const { recentSales, loading, error } = useDashboardData()

  if (loading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="ml-4 space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="ml-auto h-4 w-16" />
          </div>
        ))}
      </div>
    )
  }

  if (error || !recentSales?.sales) {
    return (
      <div className="h-40 flex items-center justify-center text-muted-foreground">
        最近の売上データの読み込みに失敗しました
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {recentSales.sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{sale.customer.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
            {sale.productName && (
              <p className="text-xs text-muted-foreground">{sale.productName}</p>
            )}
          </div>
          <div className="ml-auto font-medium">+¥{sale.amount.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}