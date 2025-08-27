// 環境別API設定管理
export type Environment = 'local' | 'mock' | 'production'

export interface ApiConfig {
  baseUrl: string
  useMock: boolean
  enableServiceWorker: boolean
}

// 環境判定
export function getEnvironment(): Environment {
  if (typeof window === 'undefined') return 'local'
  
  const hostname = window.location.hostname
  const searchParams = new URLSearchParams(window.location.search)
  
  // URL パラメータで強制指定
  if (searchParams.get('api') === 'mock') return 'mock'
  if (searchParams.get('api') === 'local') return 'local'
  if (searchParams.get('api') === 'production') return 'production'
  
  // ドメインベース判定
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'local'
  }
  
  // デプロイ先でのデフォルトはmock
  return 'mock'
}

// 環境別設定
export const API_CONFIGS: Record<Environment, ApiConfig> = {
  local: {
    baseUrl: 'http://localhost:4010',
    useMock: false,
    enableServiceWorker: false,
  },
  mock: {
    baseUrl: '', // Service Worker interceptでモック
    useMock: true,
    enableServiceWorker: true,
  },
  production: {
    baseUrl: process.env.NEXT_PUBLIC_PROD_API_URL || '',
    useMock: false,
    enableServiceWorker: false,
  }
}

// 現在の設定取得
export function getApiConfig(): ApiConfig {
  const env = getEnvironment()
  return API_CONFIGS[env]
}

// デバッグ情報
export function getApiInfo() {
  const env = getEnvironment()
  const config = getApiConfig()
  
  return {
    environment: env,
    config,
    url: typeof window !== 'undefined' ? window.location.href : 'SSR',
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'Server',
  }
}