import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react"
import SalesChart from "./components/SalesChart"
import RecentSales from "./components/RecentSales"

// モックデータ
const mockStats = {
  totalRevenue: 45231.89,
  salesCount: 2350,
  customerCount: 1234,
  growthRate: 20.1,
}

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">売上管理ダッシュボード</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/sales/new">新規売上登録</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総売上</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{mockStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">前月比 +{mockStats.growthRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">売上件数</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.salesCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">前月比 +180件</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">顧客数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.customerCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">前月比 +19%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">成長率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{mockStats.growthRate}%</div>
            <p className="text-xs text-muted-foreground">前年同期比</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>売上推移</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SalesChart />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>最近の売上</CardTitle>
            <CardDescription>今日の売上データ</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
