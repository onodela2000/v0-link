// Mock Service Worker for Static Deployment
const API_BASE = '/api'
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

self.addEventListener('install', (event) => {
  console.log('[Mock SW] Installing...')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('[Mock SW] Activating...')
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // API requests only
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(event.request))
    return
  }
})

async function handleApiRequest(request) {
  const url = new URL(request.url)
  const mockResponse = MOCK_DATA[url.pathname]
  
  if (mockResponse) {
    console.log(`[Mock SW] Serving: ${url.pathname}`)
    
    // Simulate network delay
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
  
  // Fallback to network
  return fetch(request)
}