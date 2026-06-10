import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, Coffee, ShoppingBag, Car } from "lucide-react"

const transactions = [
  {
    id: "1",
    amount: 50000,
    type: "expense",
    category: "Makanan",
    description: "Makan siang",
    date: "12 Okt 2023",
    icon: Coffee,
  },
  {
    id: "2",
    amount: 5000000,
    type: "income",
    category: "Gaji",
    description: "Gaji bulanan",
    date: "10 Okt 2023",
    icon: ArrowUpIcon,
  },
  {
    id: "3",
    amount: 150000,
    type: "expense",
    category: "Belanja",
    description: "Beli baju",
    date: "08 Okt 2023",
    icon: ShoppingBag,
  },
  {
    id: "4",
    amount: 25000,
    type: "expense",
    category: "Transportasi",
    description: "Gojek ke kantor",
    date: "08 Okt 2023",
    icon: Car,
  },
]

export function RecentTransactions() {
  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Transaksi Terakhir</CardTitle>
        <CardDescription>
          Aktivitas keuangan terbaru Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                transaction.type === 'income' 
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                  : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
              }`}>
                <transaction.icon className="h-4 w-4" />
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category} • {transaction.date}
                </p>
              </div>
              <div className={`ml-auto font-medium ${
                transaction.type === 'income' ? 'text-emerald-500' : ''
              }`}>
                {transaction.type === 'income' ? '+' : '-'}Rp {transaction.amount.toLocaleString('id-ID')}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
