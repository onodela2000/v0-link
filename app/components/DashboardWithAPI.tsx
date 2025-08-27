'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { TrendingUp, DollarSign, ShoppingCart, Users, RefreshCw, AlertTriangle } from "lucide-react"
import { useDashboardData } from "@/hooks/use-dashboard-data"
import SalesChartWithAPI from "./SalesChartWithAPI"
import RecentSalesWithAPI from "./RecentSalesWithAPI"

export default function DashboardWithAPI() {
  const { stats, loading, error, refetch } = useDashboardData()

  if (error) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">売上管理ダッシュボード</h2>
          <Button onClick={refetch} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            再読み込み
          </Button>
        </div>
        
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            データの読み込み中にエラーが発生しました: {error}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">売上管理ダッシュボード</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={refetch} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            更新
          </Button>
          <Button asChild>
            <Link href="/sales/new">新規売上登録</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* 総売上カード */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総売上</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-24 mb-1" />
            ) : (
              <div className="text-2xl font-bold">¥{stats?.totalRevenue?.toLocaleString() || '0'}</div>
            )}
            {loading ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              <p className="text-xs text-muted-foreground">
                前月比 +{stats?.growthRate || 0}%
              </p>
            )}
          </CardContent>
        </Card>

        {/* 売上件数カード */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">売上件数</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-20 mb-1" />
            ) : (
              <div className="text-2xl font-bold">{stats?.salesCount?.toLocaleString() || '0'}</div>
            )}
            {loading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <p className="text-xs text-muted-foreground">
                前月比 +{((stats?.salesCount || 0) - (stats?.previousMonthSalesCount || 0))}件
              </p>
            )}
          </CardContent>
        </Card>

        {/* 顧客数カード */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">顧客数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-20 mb-1" />
            ) : (
              <div className="text-2xl font-bold">{stats?.customerCount?.toLocaleString() || '0'}</div>
            )}
            {loading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <p className="text-xs text-muted-foreground">
                前月比 +{Math.round(((stats?.customerCount || 0) - (stats?.previousMonthCustomerCount || 0)) / (stats?.previousMonthCustomerCount || 1) * 100)}%
              </p>
            )}
          </CardContent>
        </Card>

        {/* 成長率カード */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">成長率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-7 w-16 mb-1" />
            ) : (
              <div className="text-2xl font-bold">+{stats?.growthRate || 0}%</div>
            )}
            {loading ? (
              <Skeleton className="h-4 w-12" />
            ) : (
              <p className="text-xs text-muted-foreground">前年同期比</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>売上推移</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesChartWithAPI />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>最近の売上</CardTitle>
            <CardDescription>今日の売上データ</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSalesWithAPI />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}