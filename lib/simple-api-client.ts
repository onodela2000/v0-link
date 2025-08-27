import type {
  DashboardStats,
  Sale,
  Customer,
  CreateSaleRequest,
  CreateCustomerRequest,
  GetSalesResponse,
  GetCustomersResponse,
  GetRecentSalesResponse,
  GetSalesChartResponse,
  SalesChartData,
} from "./api-types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4010"

// フォールバック用のモックデータ
const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalRevenue: 1234567,
  salesCount: 156,
  customerCount: 89,
  growthRate: 12.5,
  previousMonthRevenue: 1098765,
  previousMonthSalesCount: 144,
  previousMonthCustomerCount: 77,
}

const MOCK_RECENT_SALES: Sale[] = [
  {
    id: 1,
    customer: "田中太郎",
    email: "tanaka@example.com",
    amount: 15000,
    productName: "商品A",
    description: "商品購入",
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
  },
  {
    id: 2,
    customer: "佐藤花子",
    email: "sato@example.com",
    amount: 25000,
    productName: "商品B",
    description: "商品購入",
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-01-20T09:15:00Z",
  },
  {
    id: 3,
    customer: "鈴木一郎",
    email: "suzuki@example.com",
    amount: 8000,
    productName: "商品C",
    description: "商品購入",
    createdAt: "2024-01-20T08:45:00Z",
    updatedAt: "2024-01-20T08:45:00Z",
  },
  {
    id: 4,
    customer: "高橋美咲",
    email: "takahashi@example.com",
    amount: 32000,
    productName: "商品D",
    description: "商品購入",
    createdAt: "2024-01-19T16:20:00Z",
    updatedAt: "2024-01-19T16:20:00Z",
  },
  {
    id: 5,
    customer: "山田次郎",
    email: "yamada@example.com",
    amount: 18000,
    productName: "商品E",
    description: "商品購入",
    createdAt: "2024-01-19T14:10:00Z",
    updatedAt: "2024-01-19T14:10:00Z",
  },
]

const MOCK_CHART_DATA: SalesChartData[] = [
  { name: "1月", sales: 4000, revenue: 400000 },
  { name: "2月", sales: 3000, revenue: 300000 },
  { name: "3月", sales: 5000, revenue: 500000 },
  { name: "4月", sales: 4500, revenue: 450000 },
  { name: "5月", sales: 6000, revenue: 600000 },
  { name: "6月", sales: 5500, revenue: 550000 },
]

class SimpleApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5秒でタイムアウト

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        signal: controller.signal,
        ...options,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.warn(`API request failed for ${endpoint}, using fallback data:`, error)
      throw error
    }
  }

  // Dashboard APIs with fallback
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      return await this.request<DashboardStats>("/dashboard/stats")
    } catch (error) {
      console.log("Using mock dashboard stats")
      return MOCK_DASHBOARD_STATS
    }
  }

  async getRecentSales(limit = 5): Promise<GetRecentSalesResponse> {
    try {
      return await this.request<GetRecentSalesResponse>(`/dashboard/recent-sales?limit=${limit}`)
    } catch (error) {
      console.log("Using mock recent sales data")
      return {
        data: MOCK_RECENT_SALES.slice(0, limit),
        total: MOCK_RECENT_SALES.length,
      }
    }
  }

  async getSalesChart(period = "months", limit = 12): Promise<GetSalesChartResponse> {
    try {
      return await this.request<GetSalesChartResponse>(`/dashboard/sales-chart?period=${period}&limit=${limit}`)
    } catch (error) {
      console.log("Using mock chart data")
      return {
        period,
        data: MOCK_CHART_DATA.slice(0, limit),
      }
    }
  }

  // Sales APIs with fallback
  async getSales(params?: {
    limit?: number
    offset?: number
    sortBy?: string
    sortOrder?: string
  }): Promise<GetSalesResponse> {
    try {
      const searchParams = new URLSearchParams()
      if (params?.limit) searchParams.append("limit", params.limit.toString())
      if (params?.offset) searchParams.append("offset", params.offset.toString())
      if (params?.sortBy) searchParams.append("sortBy", params.sortBy)
      if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder)

      const query = searchParams.toString()
      return await this.request<GetSalesResponse>(`/sales${query ? `?${query}` : ""}`)
    } catch (error) {
      console.log("Using mock sales data")
      const limit = params?.limit || 20
      const offset = params?.offset || 0
      return {
        sales: MOCK_RECENT_SALES.slice(offset, offset + limit),
        total: MOCK_RECENT_SALES.length,
        limit,
        offset,
      }
    }
  }

  async createSale(data: CreateSaleRequest): Promise<Sale> {
    try {
      return await this.request<Sale>("/sales", {
        method: "POST",
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log("Creating mock sale")
      // モック用の新しい売上データを作成
      const newSale: Sale = {
        id: Date.now(),
        customer: data.customer,
        email: data.email,
        amount: data.amount,
        productName: data.productName,
        description: data.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return newSale
    }
  }

  // Customer APIs with fallback
  async getCustomers(params?: {
    limit?: number
    offset?: number
    search?: string
  }): Promise<GetCustomersResponse> {
    try {
      const searchParams = new URLSearchParams()
      if (params?.limit) searchParams.append("limit", params.limit.toString())
      if (params?.offset) searchParams.append("offset", params.offset.toString())
      if (params?.search) searchParams.append("search", params.search)

      const query = searchParams.toString()
      return await this.request<GetCustomersResponse>(`/customers${query ? `?${query}` : ""}`)
    } catch (error) {
      console.log("Using mock customer data")
      const mockCustomers: Customer[] = [
        {
          id: 1,
          name: "田中太郎",
          email: "tanaka@example.com",
          phone: "090-1234-5678",
          address: "東京都渋谷区",
          totalPurchaseAmount: 150000,
          purchaseCount: 5,
          lastPurchaseDate: "2024-01-20T10:30:00Z",
          createdAt: "2024-01-01T09:00:00Z",
          updatedAt: "2024-01-20T10:30:00Z",
        },
        {
          id: 2,
          name: "佐藤花子",
          email: "sato@example.com",
          phone: "090-2345-6789",
          address: "大阪府大阪市",
          totalPurchaseAmount: 200000,
          purchaseCount: 8,
          lastPurchaseDate: "2024-01-19T14:20:00Z",
          createdAt: "2023-12-15T10:00:00Z",
          updatedAt: "2024-01-19T14:20:00Z",
        },
      ]

      const limit = params?.limit || 20
      const offset = params?.offset || 0
      return {
        customers: mockCustomers.slice(offset, offset + limit),
        total: mockCustomers.length,
      }
    }
  }

  async createCustomer(data: CreateCustomerRequest): Promise<Customer> {
    try {
      return await this.request<Customer>("/customers", {
        method: "POST",
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log("Creating mock customer")
      const newCustomer: Customer = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        totalPurchaseAmount: 0,
        purchaseCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return newCustomer
    }
  }
}

export const apiClient = new SimpleApiClient()

// エラーハンドリング用のラッパー関数（現在は不要だが、将来の拡張用に残す）
export async function withErrorHandling<T>(apiCall: () => Promise<T>): Promise<T | null> {
  try {
    return await apiCall()
  } catch (error) {
    console.error("API Error:", error)
    return null
  }
}
