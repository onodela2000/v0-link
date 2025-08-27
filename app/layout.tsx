import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "./components/Sidebar"
import MockServiceWorker from "@/components/MockServiceWorker"
import FetchMockProvider from "@/components/FetchMockProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "売上管理システム",
  description: "Next.jsで構築された売上管理システム",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <FetchMockProvider />
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
        <MockServiceWorker />
      </body>
    </html>
  )
}
