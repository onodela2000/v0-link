// APIクライアント設定とヘルパー関数
import { Configuration, DefaultApi } from '../src/api/src/index'
import { getApiConfig } from './api-config'

// 動的にAPIクライアント設定を取得
function getApiClient() {
  const config = getApiConfig()
  const configuration = new Configuration({
    basePath: config.baseUrl || window?.location.origin || '',
  })
  return new DefaultApi(configuration)
}

// APIクライアントインスタンス（動的取得用）
export function getApiClientInstance() {
  return getApiClient()
}

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
    const client = getApiClientInstance()
    return withErrorHandling(() => client.getDashboardStats())
  },

  // 売上チャートデータ取得
  async getSalesChart(period: 'months' | 'weeks' | 'days' = 'months', limit = 12) {
    const client = getApiClientInstance()
    return withErrorHandling(() => 
      client.getSalesChart({ period, limit })
    )
  },

  // 最近の売上データ取得
  async getRecentSales(limit = 5) {
    const client = getApiClientInstance()
    return withErrorHandling(() => 
      client.getRecentSales({ limit })
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
    const client = getApiClientInstance()
    return withErrorHandling(() => 
      client.getSales(options)
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
    const client = getApiClientInstance()
    return withErrorHandling(() => 
      client.createSale({ createSaleRequest: saleData })
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
    const client = getApiClientInstance()
    return withErrorHandling(() => 
      client.getCustomers(options)
    )
  },

  // 顧客データ作成
  async createCustomer(customerData: {
    name: string
    email: string
    phone?: string
    address?: string
  }) {
    const client = getApiClientInstance()
    return withErrorHandling(() => 
      client.createCustomer({ createCustomerRequest: customerData })
    )
  },
}