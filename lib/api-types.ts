// API型定義
export interface DashboardStats {
  totalRevenue: number
  salesCount: number
  customerCount: number
  growthRate: number
  previousMonthRevenue?: number
  previousMonthSalesCount?: number
  previousMonthCustomerCount?: number
}

export interface Sale {
  id: number
  customer: string
  email: string
  amount: number
  productName: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  totalPurchaseAmount?: number
  purchaseCount?: number
  lastPurchaseDate?: string
  createdAt: string
  updatedAt: string
}

export interface SalesChartData {
  name: string
  sales: number
  revenue: number
}

export interface CreateSaleRequest {
  customer: string
  email: string
  amount: number
  productName: string
  description?: string
}

export interface CreateCustomerRequest {
  name: string
  email: string
  phone?: string
  address?: string
}

export interface GetSalesResponse {
  sales: Sale[]
  total: number
  limit: number
  offset: number
}

export interface GetCustomersResponse {
  customers: Customer[]
  total: number
}

export interface GetRecentSalesResponse {
  data: Sale[]
  total: number
}

export interface GetSalesChartResponse {
  period: string
  data: SalesChartData[]
}
