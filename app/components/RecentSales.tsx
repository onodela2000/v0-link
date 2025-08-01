import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentSales = [
  {
    id: 1,
    customer: "田中太郎",
    email: "tanaka@example.com",
    amount: 1999,
  },
  {
    id: 2,
    customer: "佐藤花子",
    email: "sato@example.com",
    amount: 39000,
  },
  {
    id: 3,
    customer: "鈴木一郎",
    email: "suzuki@example.com",
    amount: 299,
  },
  {
    id: 4,
    customer: "高橋美咲",
    email: "takahashi@example.com",
    amount: 99000,
  },
  {
    id: 5,
    customer: "山田次郎",
    email: "yamada@example.com",
    amount: 39000,
  },
]

export default function RecentSales() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{sale.customer.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.customer}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">+¥{sale.amount.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
