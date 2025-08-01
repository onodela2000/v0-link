"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "1月", sales: 4000 },
  { name: "2月", sales: 3000 },
  { name: "3月", sales: 5000 },
  { name: "4月", sales: 4500 },
  { name: "5月", sales: 6000 },
  { name: "6月", sales: 5500 },
  { name: "7月", sales: 7000 },
  { name: "8月", sales: 6500 },
  { name: "9月", sales: 8000 },
  { name: "10月", sales: 7500 },
  { name: "11月", sales: 9000 },
  { name: "12月", sales: 8500 },
]

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `¥${value}`}
        />
        <Tooltip formatter={(value) => [`¥${value}`, "売上"]} labelStyle={{ color: "#000" }} />
        <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
