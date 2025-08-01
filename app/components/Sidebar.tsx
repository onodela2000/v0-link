"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, DollarSign, Home, Plus, Settings, Users } from "lucide-react"

const navigation = [
  { name: "ダッシュボード", href: "/", icon: Home },
  { name: "売上一覧", href: "/sales", icon: DollarSign },
  { name: "新規登録", href: "/sales/new", icon: Plus },
  { name: "分析", href: "/analytics", icon: BarChart3 },
  { name: "顧客管理", href: "/customers", icon: Users },
  { name: "設定", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 bg-blue-600">
        <h1 className="text-xl font-bold text-white">売上管理システム</h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.name}
              asChild
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn("w-full justify-start", pathname === item.href && "bg-blue-100 text-blue-700")}
            >
              <Link href={item.href}>
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}
