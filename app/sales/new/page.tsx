"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewSalePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    date: "",
    customer: "",
    product: "",
    quantity: "",
    unitPrice: "",
    status: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここで実際のデータ保存処理を行う
    console.log("売上データ:", formData)
    // 成功後、売上一覧ページにリダイレクト
    router.push("/sales")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/sales">
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">新規売上登録</h2>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>売上情報入力</CardTitle>
          <CardDescription>新しい売上データを登録してください</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">売上日</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer">顧客名</Label>
                <Input
                  id="customer"
                  placeholder="顧客名を入力"
                  value={formData.customer}
                  onChange={(e) => handleInputChange("customer", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">商品名</Label>
              <Input
                id="product"
                placeholder="商品名を入力"
                value={formData.product}
                onChange={(e) => handleInputChange("product", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">数量</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="数量"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitPrice">単価</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  placeholder="単価"
                  value={formData.unitPrice}
                  onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">ステータス</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="ステータスを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="完了">完了</SelectItem>
                  <SelectItem value="保留">保留</SelectItem>
                  <SelectItem value="キャンセル">キャンセル</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">備考</Label>
              <Textarea
                id="notes"
                placeholder="備考があれば入力してください"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="flex-1">
                登録する
              </Button>
              <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href="/sales">キャンセル</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
