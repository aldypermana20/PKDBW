"use client"

import { StatsCard } from "@/components/dashboard/stats-card"
import { ChartOverview } from "@/components/dashboard/chart-overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { Wallet, TrendingUp, TrendingDown, CreditCard } from "lucide-react"
import { useTransactions } from "@/hooks/use-transactions"
import { useMemo } from "react"
import { AddTransactionModal } from "@/components/transaksi/add-transaction-modal"

export default function DashboardPage() {
  const { transactions, loading, error } = useTransactions()

  const stats = useMemo(() => {
    let totalIncome = 0
    let totalExpense = 0
    let monthIncome = 0
    let monthExpense = 0

    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    transactions.forEach(t => {
      if (t.type === 'income') totalIncome += t.amount
      else totalExpense += t.amount

      const tDate = new Date(t.date)
      if (tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear) {
        if (t.type === 'income') monthIncome += t.amount
        else monthExpense += t.amount
      }
    })

    const balance = totalIncome - totalExpense
    const monthBalance = monthIncome - monthExpense

    return {
      balance,
      monthIncome,
      monthExpense,
      monthBalance
    }
  }, [transactions])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Ringkasan keuangan Anda saat ini.
          </p>
        </div>
        <AddTransactionModal />
      </div>

      {error && (
        <div className="p-4 mb-4 text-sm text-rose-800 rounded-lg bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400 border border-rose-200 dark:border-rose-800" role="alert">
          <span className="font-medium">Peringatan:</span> {error}
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Saldo" 
          value={loading ? "Memuat..." : `Rp ${stats.balance.toLocaleString('id-ID')}`} 
          icon={Wallet} 
        />
        <StatsCard 
          title="Pemasukan Bulan Ini" 
          value={loading ? "Memuat..." : `Rp ${stats.monthIncome.toLocaleString('id-ID')}`} 
          icon={TrendingUp} 
        />
        <StatsCard 
          title="Pengeluaran Bulan Ini" 
          value={loading ? "Memuat..." : `Rp ${stats.monthExpense.toLocaleString('id-ID')}`} 
          icon={TrendingDown} 
        />
        <StatsCard 
          title="Selisih Bulan Ini" 
          value={loading ? "Memuat..." : `Rp ${stats.monthBalance.toLocaleString('id-ID')}`} 
          icon={CreditCard} 
          description="Sisa uang bulan ini" 
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ChartOverview />
        <RecentTransactions />
      </div>
    </div>
  )
}
