"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCw, DollarSign, ShoppingCart, Users, TrendingUp, AlertCircle } from "lucide-react"
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { SalesChartWithAPI } from "./SalesChartWithAPI"
import { RecentSalesWithAPI } from "./RecentSalesWithAPI"

export function DashboardWithAPI() {
  const { stats, recentSales, chartData, loading, error, refetch } = useDashboardData()

  if (error) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            {error}
            <Button variant="outline" size="sm" onClick={refetch}>
              <RefreshCw className="h-4 w-4 mr-2" />
              再試行
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">ダッシュボード</h2>
        <Button variant="outline" size="sm" onClick={refetch} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          更新
        </Button>
      </div>

      {/* 統計カード */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総売上</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <div className="text-2xl font-bold">¥{stats?.totalRevenue?.toLocaleString() || "0"}</div>
            )}
            {loading ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              <p className="text-xs text-muted-foreground">前月比 +{stats?.growthRate || 0}%</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">売上件数</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{stats?.salesCount?.toLocaleString() || 0}</div>
            )}
            {loading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <p className="text-xs text-muted-foreground">
                前月比 +{(stats?.salesCount || 0) - (stats?.previousMonthSalesCount || 0)}件
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">顧客数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">{stats?.customerCount?.toLocaleString() || 0}</div>
            )}
            {loading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <p className="text-xs text-muted-foreground">
                前月比 +{(stats?.customerCount || 0) - (stats?.previousMonthCustomerCount || 0)}人
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">成長率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div className="text-2xl font-bold">+{stats?.growthRate || 0}%</div>
            )}
            {loading ? <Skeleton className="h-4 w-12" /> : <p className="text-xs text-muted-foreground">前月比</p>}
          </CardContent>
        </Card>
      </div>

      {/* チャートと最近の売上 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>売上推移</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesChartWithAPI data={chartData} loading={loading} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>最近の売上</CardTitle>
            <CardDescription>直近の売上データを表示しています</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSalesWithAPI data={recentSales} loading={loading} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
