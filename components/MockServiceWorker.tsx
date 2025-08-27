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

    // Service Worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/mockServiceWorker.js')
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
          console.error('[Mock SW] Registration failed:', error)
          setStatus('error')
        })
    } else {
      setStatus('error')
    }
  }, [])

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