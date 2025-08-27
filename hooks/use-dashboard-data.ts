'use client'

import { useState, useEffect } from 'react'
import { dashboardApi } from '@/lib/api-client'
import { DashboardStats, GetSalesChart200Response, GetRecentSales200Response } from '../src/api/src/index'

interface UseDashboardDataReturn {
  stats: DashboardStats | null
  chartData: GetSalesChart200Response | null
  recentSales: GetRecentSales200Response | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useDashboardData(): UseDashboardDataReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [chartData, setChartData] = useState<GetSalesChart200Response | null>(null)
  const [recentSales, setRecentSales] = useState<GetRecentSales200Response | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      // 並列でデータを取得
      const [statsResult, chartResult, recentSalesResult] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getSalesChart(),
        dashboardApi.getRecentSales(),
      ])

      // エラーチェック
      if (statsResult.error) {
        throw new Error(`Stats error: ${statsResult.error}`)
      }
      if (chartResult.error) {
        throw new Error(`Chart error: ${chartResult.error}`)
      }
      if (recentSalesResult.error) {
        throw new Error(`Recent sales error: ${recentSalesResult.error}`)
      }

      // データ設定
      setStats(statsResult.data || null)
      setChartData(chartResult.data || null)
      setRecentSales(recentSalesResult.data || null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'データの取得に失敗しました'
      setError(errorMessage)
      console.error('Dashboard data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    stats,
    chartData,
    recentSales,
    loading,
    error,
    refetch: fetchData,
  }
}