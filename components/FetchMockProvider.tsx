'use client'

import { useEffect } from 'react'
import { getApiConfig } from '@/lib/api-config'

// Fetch API インターセプト用のモックデータ
const MOCK_DATA = {
  '/api/dashboard/stats': {
    totalRevenue: 45231.89,
    salesCount: 2350,
    customerCount: 1234,
    growthRate: 20.1,
    previousMonthRevenue: 37693.24,
    previousMonthSalesCount: 2170,
    previousMonthCustomerCount: 1037
  },
  '/api/dashboard/sales-chart': {
    period: 'months',
    data: [
      { name: '1月', sales: 4000, revenue: 400000 },
      { name: '2月', sales: 3000, revenue: 300000 },
      { name: '3月', sales: 5000, revenue: 500000 },
      { name: '4月', sales: 4500, revenue: 450000 },
      { name: '5月', sales: 6000, revenue: 600000 },
      { name: '6月', sales: 5500, revenue: 550000 },
      { name: '7月', sales: 10000, revenue: 700000 },
      { name: '8月', sales: 6500, revenue: 650000 },
      { name: '9月', sales: 8000, revenue: 800000 },
      { name: '10月', sales: 7500, revenue: 750000 },
      { name: '11月', sales: 9000, revenue: 900000 },
      { name: '12月', sales: 8500, revenue: 850000 }
    ]
  },
  '/api/dashboard/recent-sales': {
    sales: [
      {
        id: 1,
        customer: '田中太郎',
        email: 'tanaka@example.com',
        amount: 1999,
        productName: '商品A',
        createdAt: '2024-01-18T10:30:00Z'
      },
      {
        id: 2,
        customer: '佐藤花子',
        email: 'sato@example.com',
        amount: 39000,
        productName: '商品B',
        createdAt: '2024-01-18T09:15:00Z'
      },
      {
        id: 3,
        customer: '鈴木一郎',
        email: 'suzuki@example.com',
        amount: 299,
        productName: '商品C',
        createdAt: '2024-01-18T08:45:00Z'
      }
    ],
    total: 2350
  }
}

export default function FetchMockProvider() {
  useEffect(() => {
    const config = getApiConfig()
    
    if (!config.useMock) return

    // オリジナルfetch関数を保存
    const originalFetch = window.fetch

    // fetch関数をオーバーライド
    window.fetch = async function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
      const urlObj = new URL(url, window.location.origin)
      
      // API pathがモックデータに存在するかチェック
      const mockResponse = MOCK_DATA[urlObj.pathname as keyof typeof MOCK_DATA]
      
      if (mockResponse && urlObj.pathname.startsWith('/api/')) {
        console.log('[Fetch Mock] Serving:', urlObj.pathname)
        
        // リアルな遅延をシミュレート
        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200))
        
        // モックレスポンスを返す
        return new Response(JSON.stringify(mockResponse), {
          status: 200,
          statusText: 'OK',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      }
      
      // モックデータが存在しない場合は元のfetch実行
      return originalFetch.call(this, input, init)
    }

    // クリーンアップ関数
    return () => {
      window.fetch = originalFetch
    }
  }, [])

  return null
}