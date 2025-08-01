import { NextResponse } from "next/server"

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
  // 他のデータ...
]

export async function GET() {
  try {
    return NextResponse.json(salesData)
  } catch (error) {
    return NextResponse.json({ error: "売上データの取得に失敗しました" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 新しい売上データを作成
    const newSale = {
      id: salesData.length + 1,
      ...body,
      total: body.quantity * body.unitPrice,
    }

    salesData.push(newSale)

    return NextResponse.json(newSale, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "売上データの作成に失敗しました" }, { status: 500 })
  }
}
