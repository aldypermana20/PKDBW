import { StatsCard } from "@/components/dashboard/stats-card"
import { ChartOverview } from "@/components/dashboard/chart-overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { Wallet, TrendingUp, TrendingDown, CreditCard } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Ringkasan keuangan Anda saat ini.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Saldo" 
          value="Rp 15.500.000" 
          icon={Wallet} 
          trend="up" 
          trendValue="12.5%" 
        />
        <StatsCard 
          title="Pemasukan Bulan Ini" 
          value="Rp 8.000.000" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="5.2%" 
        />
        <StatsCard 
          title="Pengeluaran Bulan Ini" 
          value="Rp 3.500.000" 
          icon={TrendingDown} 
          trend="down" 
          trendValue="1.1%" 
        />
        <StatsCard 
          title="Selisih" 
          value="Rp 4.500.000" 
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
