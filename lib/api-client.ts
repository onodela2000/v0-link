// APIクライアント設定とヘルパー関数
import { Configuration, DefaultApi } from "../src/api/src/index"

// API設定
const configuration = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4010",
  headers: {
    "Content-Type": "application/json",
  },
})

// APIクライアントのインスタンス
export const apiClient = new DefaultApi(configuration)

// エラーハンドリング用のラッパー関数
export async function withErrorHandling<T>(apiCall: () => Promise<T>): Promise<T | null> {
  try {
    return await apiCall()
  } catch (error) {
    console.error("API Error:", error)
    return null
  }
}

// ダッシュボード用のAPIヘルパー関数
export const dashboardApi = {
  // ダッシュボード統計データ取得
  async getStats() {
    return withErrorHandling(() => apiClient.getDashboardStats())
  },

  // 売上チャートデータ取得
  async getSalesChart(period: "months" | "weeks" | "days" = "months", limit = 12) {
    return withErrorHandling(() => apiClient.getSalesChart({ period, limit }))
  },

  // 最近の売上データ取得
  async getRecentSales(limit = 5) {
    return withErrorHandling(() => apiClient.getRecentSales({ limit }))
  },
}

// 売上データ用のAPIヘルパー関数
export const salesApi = {
  // 売上一覧取得
  async getSales(options?: {
    limit?: number
    offset?: number
    sortBy?: "createdAt" | "amount" | "customer"
    sortOrder?: "asc" | "desc"
  }) {
    return withErrorHandling(() => apiClient.getSales(options))
  },

  // 売上データ作成
  async createSale(saleData: {
    customer: string
    email: string
    amount: number
    productName: string
    description?: string
  }) {
    return withErrorHandling(() => apiClient.createSale({ createSaleRequest: saleData }))
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
    return withErrorHandling(() => apiClient.getCustomers(options))
  },

  // 顧客データ作成
  async createCustomer(customerData: {
    name: string
    email: string
    phone?: string
    address?: string
  }) {
    return withErrorHandling(() => apiClient.createCustomer({ createCustomerRequest: customerData }))
  },
}
