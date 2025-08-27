/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface CreateCustomerRequest
 */
export interface CreateCustomerRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateCustomerRequest
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCustomerRequest
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCustomerRequest
     */
    phone?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCustomerRequest
     */
    address?: string;
}
/**
 * 
 * @export
 * @interface CreateSaleRequest
 */
export interface CreateSaleRequest {
    /**
     * 顧客名
     * @type {string}
     * @memberof CreateSaleRequest
     */
    customer: string;
    /**
     * 顧客メールアドレス
     * @type {string}
     * @memberof CreateSaleRequest
     */
    email: string;
    /**
     * 売上金額
     * @type {number}
     * @memberof CreateSaleRequest
     */
    amount: number;
    /**
     * 商品名
     * @type {string}
     * @memberof CreateSaleRequest
     */
    productName: string;
    /**
     * 売上詳細
     * @type {string}
     * @memberof CreateSaleRequest
     */
    description?: string;
}
/**
 * 
 * @export
 * @interface Customer
 */
export interface Customer {
    /**
     * 顧客ID
     * @type {number}
     * @memberof Customer
     */
    id: number;
    /**
     * 顧客名
     * @type {string}
     * @memberof Customer
     */
    name: string;
    /**
     * メールアドレス
     * @type {string}
     * @memberof Customer
     */
    email: string;
    /**
     * 電話番号
     * @type {string}
     * @memberof Customer
     */
    phone?: string;
    /**
     * 住所
     * @type {string}
     * @memberof Customer
     */
    address?: string;
    /**
     * 総購入金額
     * @type {number}
     * @memberof Customer
     */
    totalPurchaseAmount?: number;
    /**
     * 購入回数
     * @type {number}
     * @memberof Customer
     */
    purchaseCount?: number;
    /**
     * 最終購入日
     * @type {string}
     * @memberof Customer
     */
    lastPurchaseDate?: string;
    /**
     * 顧客登録日時
     * @type {string}
     * @memberof Customer
     */
    createdAt: string;
    /**
     * 顧客情報最終更新日時
     * @type {string}
     * @memberof Customer
     */
    updatedAt: string;
}
/**
 * 
 * @export
 * @interface DashboardStats
 */
export interface DashboardStats {
    /**
     * 総売上金額
     * @type {number}
     * @memberof DashboardStats
     */
    totalRevenue: number;
    /**
     * 総売上件数
     * @type {number}
     * @memberof DashboardStats
     */
    salesCount: number;
    /**
     * 総顧客数
     * @type {number}
     * @memberof DashboardStats
     */
    customerCount: number;
    /**
     * 成長率（%）
     * @type {number}
     * @memberof DashboardStats
     */
    growthRate: number;
    /**
     * 前月の売上金額
     * @type {number}
     * @memberof DashboardStats
     */
    previousMonthRevenue?: number;
    /**
     * 前月の売上件数
     * @type {number}
     * @memberof DashboardStats
     */
    previousMonthSalesCount?: number;
    /**
     * 前月の顧客数
     * @type {number}
     * @memberof DashboardStats
     */
    previousMonthCustomerCount?: number;
}
/**
 * 
 * @export
 * @interface GetCustomers200Response
 */
export interface GetCustomers200Response {
    /**
     * 
     * @type {Array<Customer>}
     * @memberof GetCustomers200Response
     */
    customers?: Array<Customer>;
    /**
     * 
     * @type {number}
     * @memberof GetCustomers200Response
     */
    total?: number;
}
/**
 * 
 * @export
 * @interface GetRecentSales200Response
 */
export interface GetRecentSales200Response {
    /**
     * 
     * @type {Array<RecentSale>}
     * @memberof GetRecentSales200Response
     */
    sales?: Array<RecentSale>;
    /**
     * 総売上件数
     * @type {number}
     * @memberof GetRecentSales200Response
     */
    total?: number;
}
/**
 * 
 * @export
 * @interface GetSales200Response
 */
export interface GetSales200Response {
    /**
     * 
     * @type {Array<Sale>}
     * @memberof GetSales200Response
     */
    sales?: Array<Sale>;
    /**
     * 
     * @type {number}
     * @memberof GetSales200Response
     */
    total?: number;
    /**
     * 
     * @type {number}
     * @memberof GetSales200Response
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof GetSales200Response
     */
    offset?: number;
}
/**
 * 
 * @export
 * @interface GetSalesChart200Response
 */
export interface GetSalesChart200Response {
    /**
     * データ期間
     * @type {string}
     * @memberof GetSalesChart200Response
     */
    period?: string;
    /**
     * 
     * @type {Array<SalesChartData>}
     * @memberof GetSalesChart200Response
     */
    data?: Array<SalesChartData>;
}
/**
 * 
 * @export
 * @interface ModelError
 */
export interface ModelError {
    /**
     * エラーの種類
     * @type {string}
     * @memberof ModelError
     */
    error: string;
    /**
     * エラーの詳細メッセージ
     * @type {string}
     * @memberof ModelError
     */
    message: string;
    /**
     * エラーコード
     * @type {string}
     * @memberof ModelError
     */
    code?: string;
    /**
     * エラーの詳細情報
     * @type {object}
     * @memberof ModelError
     */
    details?: object;
}
/**
 * 
 * @export
 * @interface RecentSale
 */
export interface RecentSale {
    /**
     * 売上ID
     * @type {number}
     * @memberof RecentSale
     */
    id: number;
    /**
     * 顧客名
     * @type {string}
     * @memberof RecentSale
     */
    customer: string;
    /**
     * 顧客メールアドレス
     * @type {string}
     * @memberof RecentSale
     */
    email: string;
    /**
     * 売上金額
     * @type {number}
     * @memberof RecentSale
     */
    amount: number;
    /**
     * 商品名
     * @type {string}
     * @memberof RecentSale
     */
    productName: string;
    /**
     * 売上作成日時
     * @type {string}
     * @memberof RecentSale
     */
    createdAt: string;
}
/**
 * 
 * @export
 * @interface Sale
 */
export interface Sale {
    /**
     * 売上ID
     * @type {number}
     * @memberof Sale
     */
    id: number;
    /**
     * 顧客名
     * @type {string}
     * @memberof Sale
     */
    customer: string;
    /**
     * 顧客メールアドレス
     * @type {string}
     * @memberof Sale
     */
    email: string;
    /**
     * 売上金額
     * @type {number}
     * @memberof Sale
     */
    amount: number;
    /**
     * 商品名
     * @type {string}
     * @memberof Sale
     */
    productName: string;
    /**
     * 売上詳細
     * @type {string}
     * @memberof Sale
     */
    description?: string;
    /**
     * 売上作成日時
     * @type {string}
     * @memberof Sale
     */
    createdAt: string;
    /**
     * 売上最終更新日時
     * @type {string}
     * @memberof Sale
     */
    updatedAt: string;
}
/**
 * 
 * @export
 * @interface SalesChartData
 */
export interface SalesChartData {
    /**
     * 期間名（月名、週名、日付など）
     * @type {string}
     * @memberof SalesChartData
     */
    name: string;
    /**
     * 売上件数
     * @type {number}
     * @memberof SalesChartData
     */
    sales: number;
    /**
     * 売上金額
     * @type {number}
     * @memberof SalesChartData
     */
    revenue: number;
}
