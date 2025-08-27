"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import type { SalesChartData } from "@/lib/api-types"

interface SalesChartWithAPIProps {
  data: SalesChartData[]
  loading: boolean
}

export function SalesChartWithAPI({ data, loading }: SalesChartWithAPIProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    )
  }

  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-[200px] text-muted-foreground">データがありません</div>
  }

  return (
    <ChartContainer
      config={{
        revenue: {
          label: "売上金額",
          color: "hsl(var(--chart-1))",
        },
        sales: {
          label: "売上件数",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `¥${value.toLocaleString()}`}
          />
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return <ChartTooltipContent active={active} payload={payload} label={label} />
              }
              return null
            }}
          />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
