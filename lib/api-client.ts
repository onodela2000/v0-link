// APIクライアント設定とヘルパー関数
import { Configuration, DefaultApi } from '../src/api/src/index'

// APIクライアントの設定
const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4010',
})

// APIクライアントインスタンス
export const apiClient = new DefaultApi(configuration)

// エラーハンドリング付きのAPI呼び出しラッパー
export async function withErrorHandling<T>(
  apiCall: () => Promise<T>
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await apiCall()
    return { data }
  } catch (error) {
    console.error('API call failed:', error)
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }
  }
}

// ダッシュボード用のAPIヘルパー関数
export const dashboardApi = {
  // ダッシュボード統計データ取得
  async getStats() {
    return withErrorHandling(() => apiClient.getDashboardStats())
  },

  // 売上チャートデータ取得
  async getSalesChart(period: 'months' | 'weeks' | 'days' = 'months', limit = 12) {
    return withErrorHandling(() => 
      apiClient.getSalesChart({ period, limit })
    )
  },

  // 最近の売上データ取得
  async getRecentSales(limit = 5) {
    return withErrorHandling(() => 
      apiClient.getRecentSales({ limit })
    )
  },
}

// 売上データ用のAPIヘルパー関数
export const salesApi = {
  // 売上一覧取得
  async getSales(options?: {
    limit?: number
    offset?: number
    sortBy?: 'createdAt' | 'amount' | 'customer'
    sortOrder?: 'asc' | 'desc'
  }) {
    return withErrorHandling(() => 
      apiClient.getSales(options)
    )
  },

  // 売上データ作成
  async createSale(saleData: {
    customer: string
    email: string
    amount: number
    productName: string
    description?: string
  }) {
    return withErrorHandling(() => 
      apiClient.createSale({ createSaleRequest: saleData })
    )
  },
}

// 顧客データ用のAPIヘルパー関数
export const customersApi = {
  // 顧客一覧取得
  async getCustomers(options?: {
    limit?: number
    offset?: number
    search?: string
  }) {
    return withErrorHandling(() => 
      apiClient.getCustomers(options)
    )
  },

  // 顧客データ作成
  async createCustomer(customerData: {
    name: string
    email: string
    phone?: string
    address?: string
  }) {
    return withErrorHandling(() => 
      apiClient.createCustomer({ createCustomerRequest: customerData })
    )
  },
}