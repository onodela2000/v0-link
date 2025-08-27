'use client'

import { useEffect, useState } from 'react'
import { getApiConfig, getApiInfo } from '@/lib/api-config'

export default function MockServiceWorker() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'disabled'>('loading')
  const [apiInfo, setApiInfo] = useState<any>(null)

  useEffect(() => {
    const config = getApiConfig()
    const info = getApiInfo()
    setApiInfo(info)

    if (!config.enableServiceWorker) {
      setStatus('disabled')
      return
    }

    // Service Worker registration with fallback
    if ('serviceWorker' in navigator) {
      // 静的ファイルホスティング対応
      const swPath = '/mockServiceWorker.js'
      
      // まずファイルの存在確認
      fetch(swPath, { method: 'HEAD' })
        .then(response => {
          if (!response.ok || !response.headers.get('content-type')?.includes('javascript')) {
            throw new Error('Service Worker file not available or wrong MIME type')
          }
          return navigator.serviceWorker.register(swPath, {
            scope: '/'
          })
        })
        .then((registration) => {
          console.log('[Mock SW] Registration successful:', registration)
          setStatus('ready')
          
          // Service Worker更新チェック
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                  console.log('[Mock SW] Updated and activated')
                }
              })
            }
          })
        })
        .catch((error) => {
          console.warn('[Mock SW] Registration failed, falling back to inline SW:', error)
          // フォールバック: インラインService Worker
          registerInlineServiceWorker()
        })
    } else {
      setStatus('error')
    }
  }, [])

  // フォールバック: インラインService Worker
  const registerInlineServiceWorker = () => {
    const swCode = `
      const MOCK_DATA = ${JSON.stringify({
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
      })};

      self.addEventListener('install', () => {
        console.log('[Inline Mock SW] Installing...')
        self.skipWaiting()
      })

      self.addEventListener('activate', () => {
        console.log('[Inline Mock SW] Activating...')
        self.clients.claim()
      })

      self.addEventListener('fetch', (event) => {
        const url = new URL(event.request.url)
        
        if (url.pathname.startsWith('/api/')) {
          event.respondWith(handleApiRequest(event.request))
        }
      })

      async function handleApiRequest(request) {
        const url = new URL(request.url)
        const mockResponse = MOCK_DATA[url.pathname]
        
        if (mockResponse) {
          console.log('[Inline Mock SW] Serving:', url.pathname)
          
          await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200))
          
          return new Response(JSON.stringify(mockResponse), {
            status: 200,
            statusText: 'OK',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
          })
        }
        
        return fetch(request)
      }
    `

    const blob = new Blob([swCode], { type: 'application/javascript' })
    const swUrl = URL.createObjectURL(blob)

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('[Inline Mock SW] Registration successful:', registration)
        setStatus('ready')
        URL.revokeObjectURL(swUrl)
      })
      .catch((error) => {
        console.error('[Inline Mock SW] Registration failed:', error)
        setStatus('error')
        URL.revokeObjectURL(swUrl)
      })
  }

  // 開発環境でのみデバッグ情報表示
  if (process.env.NODE_ENV === 'development' && apiInfo) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm">
        <details className="bg-gray-900 text-white p-3 rounded-lg text-xs font-mono">
          <summary className="cursor-pointer mb-2">
            🔧 API Status: <span className={getStatusColor(status)}>{status}</span>
          </summary>
          <div className="space-y-1">
            <div><strong>Env:</strong> {apiInfo.environment}</div>
            <div><strong>Base URL:</strong> {apiInfo.config.baseUrl || 'Service Worker'}</div>
            <div><strong>Use Mock:</strong> {apiInfo.config.useMock ? 'Yes' : 'No'}</div>
            <div><strong>SW Enabled:</strong> {apiInfo.config.enableServiceWorker ? 'Yes' : 'No'}</div>
            {status === 'ready' && (
              <div className="text-green-400">✅ Mock API Ready</div>
            )}
            {status === 'error' && (
              <div className="text-red-400">❌ Mock API Failed</div>
            )}
          </div>
        </details>
      </div>
    )
  }

  return null
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'ready': return 'text-green-400'
    case 'error': return 'text-red-400'
    case 'loading': return 'text-yellow-400'
    case 'disabled': return 'text-gray-400'
    default: return 'text-white'
  }
}