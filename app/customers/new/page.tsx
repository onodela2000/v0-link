"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, UserPlus } from "lucide-react"
import Link from "next/link"

interface NewCustomer {
  name: string
  email: string
  phone: string
  company: string
  position: string
  address: string
  status: string
  notes: string
}

const initialCustomer: NewCustomer = {
  name: "",
  email: "",
  phone: "",
  company: "",
  position: "",
  address: "",
  status: "見込み",
  notes: ""
}

export default function NewCustomerPage() {
  const router = useRouter()
  const [customer, setCustomer] = useState<NewCustomer>(initialCustomer)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Static Export版：ローカルストレージに保存
    try {
      const existingCustomers = JSON.parse(localStorage.getItem('customers') || '[]')
      const newCustomer = {
        ...customer,
        id: Date.now(),
        totalPurchases: 0,
        lastPurchase: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const updatedCustomers = [...existingCustomers, newCustomer]
      localStorage.setItem('customers', JSON.stringify(updatedCustomers))
      
      console.log("新規顧客を登録:", newCustomer)
      router.push("/customers")
    } catch (error) {
      console.error("登録エラー:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof NewCustomer, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/customers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Link>
        </Button>
        <div className="flex items-center space-x-2">
          <UserPlus className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">新規顧客登録</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>
                顧客の基本的な情報を入力してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">顧客名 *</Label>
                <Input
                  id="name"
                  value={customer.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="例: 田中 太郎"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="例: tanaka@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input
                  id="phone"
                  value={customer.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="例: 090-1234-5678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">ステータス</Label>
                <Select value={customer.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="見込み">見込み</SelectItem>
                    <SelectItem value="アクティブ">アクティブ</SelectItem>
                    <SelectItem value="非アクティブ">非アクティブ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>会社情報</CardTitle>
              <CardDescription>
                顧客の所属会社に関する情報
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">会社名</Label>
                <Input
                  id="company"
                  value={customer.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="例: 株式会社サンプル"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">役職</Label>
                <Input
                  id="position"
                  value={customer.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  placeholder="例: 営業部長"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Textarea
                  id="address"
                  value={customer.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                  placeholder="例: 東京都渋谷区渋谷1-1-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>備考</CardTitle>
            <CardDescription>
              顧客に関する追加情報やメモ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="notes">メモ</Label>
              <Textarea
                id="notes"
                value={customer.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={4}
                placeholder="顧客に関するメモや注意事項を入力してください..."
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" asChild>
            <Link href="/customers">キャンセル</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "登録中..." : "登録"}
          </Button>
        </div>
      </form>
    </div>
  )
}