"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Mail, Phone } from "lucide-react"
import Link from "next/link"

// モック顧客データ
const mockCustomers = [
  {
    id: 1,
    name: "田中 太郎",
    email: "tanaka@example.com",
    phone: "090-1234-5678",
    company: "株式会社サンプル",
    status: "アクティブ",
    totalPurchases: 125000,
    lastPurchase: "2024-01-15"
  },
  {
    id: 2,
    name: "佐藤 花子",
    email: "sato@example.com",
    phone: "080-9876-5432",
    company: "テスト商事",
    status: "アクティブ",
    totalPurchases: 89000,
    lastPurchase: "2024-01-10"
  },
  {
    id: 3,
    name: "山田 次郎",
    email: "yamada@example.com",
    phone: "070-5555-1234",
    company: "個人",
    status: "非アクティブ",
    totalPurchases: 45000,
    lastPurchase: "2023-12-20"
  },
  {
    id: 4,
    name: "鈴木 美咲",
    email: "suzuki@example.com",
    phone: "090-7777-8888",
    company: "デモ株式会社",
    status: "アクティブ",
    totalPurchases: 200000,
    lastPurchase: "2024-01-18"
  }
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [customers, setCustomers] = useState(mockCustomers)

  // Static Export版：ローカルストレージから顧客データを読み込み
  useEffect(() => {
    const savedCustomers = localStorage.getItem('customers')
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers))
    } else {
      // 初回アクセス時はモックデータをローカルストレージに保存
      localStorage.setItem('customers', JSON.stringify(mockCustomers))
    }
  }, [])

  const handleDeleteCustomer = (customerId: number) => {
    const updatedCustomers = customers.filter(c => c.id !== customerId)
    setCustomers(updatedCustomers)
    localStorage.setItem('customers', JSON.stringify(updatedCustomers))
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">顧客管理</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/customers/new">
              <Plus className="mr-2 h-4 w-4" />
              新規顧客登録
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総顧客数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">前月比 +12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">アクティブ顧客</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.status === "アクティブ").length}
            </div>
            <p className="text-xs text-muted-foreground">活動中の顧客</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均購入額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ¥{Math.round(customers.reduce((sum, c) => sum + c.totalPurchases, 0) / customers.length).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">顧客あたり</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総購入額</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ¥{customers.reduce((sum, c) => sum + c.totalPurchases, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">全顧客合計</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>顧客一覧</CardTitle>
          <CardDescription>
            登録されている顧客の一覧です
          </CardDescription>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="顧客名、メール、会社名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>顧客名</TableHead>
                <TableHead>会社名</TableHead>
                <TableHead>連絡先</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>総購入額</TableHead>
                <TableHead>最終購入日</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.company}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "アクティブ" ? "default" : "secondary"}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>¥{customer.totalPurchases.toLocaleString()}</TableCell>
                  <TableCell>{customer.lastPurchase}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/customers/edit?id=${customer.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}