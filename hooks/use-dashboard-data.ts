"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/simple-api-client"
import type { DashboardStats, Sale, SalesChartData } from "@/lib/api-types"

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentSales, setRecentSales] = useState<Sale[]>([])
  const [chartData, setChartData] = useState<SalesChartData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = async () => {
    setLoading(true)
    setError(null)

    try {
      // 並列でデータを取得（各APIは内部でフォールバックを処理）
      const [statsResult, recentSalesResult, chartResult] = await Promise.all([
        apiClient.getDashboardStats(),
        apiClient.getRecentSales(5),
        apiClient.getSalesChart("months", 6),
      ])

      setStats(statsResult)
      setRecentSales(recentSalesResult.data)
      setChartData(chartResult.data)
    } catch (err) {
      // この時点でエラーが発生することは稀（各APIが内部でフォールバック処理するため）
      setError("データの取得中に予期しないエラーが発生しました")
      console.error("Dashboard data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const refetch = async () => {
    await fetchDashboardData()
  }

  return {
    stats,
    recentSales,
    chartData,
    loading,
    error,
    refetch,
  }
}
