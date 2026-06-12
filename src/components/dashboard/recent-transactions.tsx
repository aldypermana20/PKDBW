"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, Coffee, ShoppingBag, Car, DollarSign, Home, Receipt, Zap } from "lucide-react"
import { useTransactions } from "@/hooks/use-transactions"

// Mapping for lucide icons dynamically or using a fallback
const iconMap: Record<string, any> = {
  Coffee,
  ShoppingBag,
  Car,
  DollarSign,
  Home,
  Receipt,
  Zap,
}

// Helper to check if a string is an emoji
const isEmoji = (str: string) => {
  const emojiRegex = /[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/u;
  return emojiRegex.test(str);
}

export function RecentTransactions() {
  const { transactions, loading } = useTransactions()

  // Display only the 5 most recent transactions
  const recentTransactions = transactions.slice(0, 5)

  if (loading) {
    return (
      <Card className="col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle>Transaksi Terakhir</CardTitle>
          <CardDescription>
            Memuat data...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-muted"></div>
                <div className="ml-4 space-y-2 flex-1">
                  <div className="h-4 w-1/3 bg-muted rounded"></div>
                  <div className="h-3 w-1/4 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle>Transaksi Terakhir</CardTitle>
        <CardDescription>
          Aktivitas keuangan terbaru Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recentTransactions.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Belum ada transaksi.
          </div>
        ) : (
          <div className="space-y-8">
            {recentTransactions.map((transaction) => {
              const catIcon = transaction.category?.icon
              
              let IconDisplay;
              if (catIcon) {
                if (isEmoji(catIcon)) {
                  IconDisplay = <span className="text-base">{catIcon}</span>
                } else if (iconMap[catIcon]) {
                  const LucideIcon = iconMap[catIcon]
                  IconDisplay = <LucideIcon className="h-4 w-4" />
                }
              }

              if (!IconDisplay) {
                const DefaultIcon = transaction.type === 'income' ? ArrowUpIcon : ArrowDownIcon
                IconDisplay = <DefaultIcon className="h-4 w-4" />
              }

              return (
                <div key={transaction.id} className="flex items-center transition-all hover:bg-muted/50 p-2 rounded-lg -mx-2">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                    transaction.type === 'income' 
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                      : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                  }`}>
                    {IconDisplay}
                  </div>
                  <div className="ml-4 space-y-1 overflow-hidden">
                    <p className="text-sm font-medium leading-none truncate">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {transaction.category?.name || 'Tanpa Kategori'} • {new Date(transaction.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className={`ml-auto font-medium whitespace-nowrap pl-4 ${
                    transaction.type === 'income' ? 'text-emerald-500' : ''
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}Rp {transaction.amount.toLocaleString('id-ID')}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
