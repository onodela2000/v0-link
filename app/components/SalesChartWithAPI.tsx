'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboardData } from "@/hooks/use-dashboard-data"

export default function SalesChartWithAPI() {
  const { chartData, loading, error } = useDashboardData()

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-[350px] w-full" />
      </div>
    )
  }

  if (error || !chartData?.data) {
    return (
      <div className="h-[350px] flex items-center justify-center text-muted-foreground">
        チャートデータの読み込みに失敗しました
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData.data}>
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
          tickFormatter={(value) => `¥${value.toLocaleString()}`}
        />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'sales') {
              return [`${value}件`, "売上件数"]
            }
            if (name === 'revenue') {
              return [`¥${(value as number).toLocaleString()}`, "売上金額"]
            }
            return [value, name]
          }}
          labelStyle={{ color: "#000" }}
        />
        <Line 
          type="monotone" 
          dataKey="sales" 
          stroke="#2563eb" 
          strokeWidth={2} 
          dot={{ fill: "#2563eb" }}
          name="sales"
        />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="#10b981" 
          strokeWidth={2} 
          dot={{ fill: "#10b981" }}
          name="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}