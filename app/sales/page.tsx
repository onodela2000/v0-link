import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"

// モック売上データ
const salesData = [
  {
    id: 1,
    date: "2024-01-15",
    customer: "田中太郎",
    product: "商品A",
    quantity: 2,
    unitPrice: 1000,
    total: 2000,
    status: "完了",
  },
  {
    id: 2,
    date: "2024-01-14",
    customer: "佐藤花子",
    product: "商品B",
    quantity: 1,
    unitPrice: 39000,
    total: 39000,
    status: "完了",
  },
  {
    id: 3,
    date: "2024-01-14",
    customer: "鈴木一郎",
    product: "商品C",
    quantity: 3,
    unitPrice: 100,
    total: 300,
    status: "保留",
  },
  {
    id: 4,
    date: "2024-01-13",
    customer: "高橋美咲",
    product: "商品D",
    quantity: 1,
    unitPrice: 99000,
    total: 99000,
    status: "完了",
  },
  {
    id: 5,
    date: "2024-01-13",
    customer: "山田次郎",
    product: "商品E",
    quantity: 2,
    unitPrice: 19500,
    total: 39000,
    status: "キャンセル",
  },
]

export default function SalesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">売上一覧</h2>
        <Button asChild>
          <Link href="/sales/new">
            <Plus className="mr-2 h-4 w-4" />
            新規売上登録
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>売上データ</CardTitle>
          <CardDescription>登録されている売上データの一覧です</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日付</TableHead>
                <TableHead>顧客名</TableHead>
                <TableHead>商品名</TableHead>
                <TableHead>数量</TableHead>
                <TableHead>単価</TableHead>
                <TableHead>合計</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell className="font-medium">{sale.customer}</TableCell>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell>{sale.quantity}</TableCell>
                  <TableCell>¥{sale.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="font-medium">¥{sale.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        sale.status === "完了" ? "default" : sale.status === "保留" ? "secondary" : "destructive"
                      }
                    >
                      {sale.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
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
