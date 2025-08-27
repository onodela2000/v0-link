"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts"

const monthlyData = [
  { month: "1月", sales: 4000, profit: 2400 },
  { month: "2月", sales: 3000, profit: 1398 },
  { month: "3月", sales: 5000, profit: 3800 },
  { month: "4月", sales: 4500, profit: 3908 },
  { month: "5月", sales: 6000, profit: 4800 },
  { month: "6月", sales: 5500, profit: 3800 },
]

const productData = [
  { name: "商品A", value: 400, color: "#0088FE" },
  { name: "商品B", value: 300, color: "#00C49F" },
  { name: "商品C", value: 300, color: "#FFBB28" },
  { name: "商品D", value: 200, color: "#FF8042" },
]

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">売上分析</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>月別売上・利益</CardTitle>
            <CardDescription>過去6ヶ月の売上と利益の推移</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`¥${value}`, name === "sales" ? "売上" : "利益"]} />
                <Bar dataKey="sales" fill="#2563eb" name="sales" />
                <Bar dataKey="profit" fill="#16a34a" name="profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>商品別売上構成</CardTitle>
            <CardDescription>商品カテゴリ別の売上割合</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>平均売上単価</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥15,420</div>
            <p className="text-xs text-muted-foreground">前月比 +12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>売上成長率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23.5%</div>
            <p className="text-xs text-muted-foreground">前年同期比</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>利益率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.2%</div>
            <p className="text-xs text-muted-foreground">前月比 +2.1%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
