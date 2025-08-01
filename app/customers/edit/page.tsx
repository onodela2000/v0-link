"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

// モック顧客データの初期値
const initialCustomer = {
  id: 1,
  name: "",
  email: "",
  phone: "",
  company: "",
  position: "",
  address: "",
  status: "アクティブ",
  notes: ""
}

function CustomerEditForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [customer, setCustomer] = useState(initialCustomer)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const customerId = searchParams.get('id')
    if (customerId) {
      // ローカルストレージから顧客データを取得
      const savedCustomers = localStorage.getItem('customers')
      if (savedCustomers) {
        const customers = JSON.parse(savedCustomers)
        const foundCustomer = customers.find((c: any) => c.id === parseInt(customerId))
        if (foundCustomer) {
          setCustomer(foundCustomer)
        }
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Static Export版：ローカルストレージを更新
    try {
      const existingCustomers = JSON.parse(localStorage.getItem('customers') || '[]')
      const updatedCustomers = existingCustomers.map((c: any) => 
        c.id === customer.id 
          ? { ...customer, updatedAt: new Date().toISOString() }
          : c
      )
      
      localStorage.setItem('customers', JSON.stringify(updatedCustomers))
      console.log("顧客情報を更新:", customer)
      router.push("/customers")
    } catch (error) {
      console.error("更新エラー:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
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
        <h2 className="text-3xl font-bold tracking-tight">顧客情報編集</h2>
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
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input
                  id="phone"
                  value={customer.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">ステータス</Label>
                <Select value={customer.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="アクティブ">アクティブ</SelectItem>
                    <SelectItem value="非アクティブ">非アクティブ</SelectItem>
                    <SelectItem value="見込み">見込み</SelectItem>
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">役職</Label>
                <Input
                  id="position"
                  value={customer.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Textarea
                  id="address"
                  value={customer.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
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
            {isLoading ? "保存中..." : "保存"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function CustomerEditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerEditForm />
    </Suspense>
  )
}