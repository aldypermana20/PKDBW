"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { useTransactions } from "@/hooks/use-transactions"
import { useMemo } from "react"

export function ChartOverview() {
  const { transactions, loading } = useTransactions()

  // Aggregate data for the last 7 months
  const chartData = useMemo(() => {
    if (!transactions) return []

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
    const today = new Date()
    const result = []

    // Get the last 7 months including current
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthName = months[d.getMonth()]
      const monthYear = `${d.getFullYear()}-${d.getMonth()}`
      
      let pemasukan = 0
      let pengeluaran = 0

      transactions.forEach(t => {
        const tDate = new Date(t.date)
        if (tDate.getFullYear() === d.getFullYear() && tDate.getMonth() === d.getMonth()) {
          if (t.type === 'income') pemasukan += t.amount
          else if (t.type === 'expense') pengeluaran += t.amount
        }
      })

      result.push({
        name: monthName,
        pemasukan,
        pengeluaran
      })
    }
    
    return result
  }, [transactions])

  if (loading) {
    return (
      <Card className="col-span-1 lg:col-span-4">
        <CardHeader>
          <CardTitle>Arus Kas</CardTitle>
          <CardDescription>Pemasukan dan pengeluaran 7 bulan terakhir</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="h-4 w-4 rounded-full bg-muted"></div>
            <div className="h-4 w-4 rounded-full bg-muted"></div>
            <div className="h-4 w-4 rounded-full bg-muted"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle>Arus Kas</CardTitle>
        <CardDescription>
          Pemasukan dan pengeluaran 7 bulan terakhir
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPemasukan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPengeluaran" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `Rp${value >= 1000000 ? (value/1000000).toFixed(1) + 'M' : value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: any) => [`Rp ${(value || 0).toLocaleString('id-ID')}`, '']}
            />
            <Area 
              type="monotone" 
              dataKey="pemasukan" 
              name="Pemasukan"
              stroke="#10B981" 
              fillOpacity={1} 
              fill="url(#colorPemasukan)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="pengeluaran" 
              name="Pengeluaran"
              stroke="#EF4444" 
              fillOpacity={1} 
              fill="url(#colorPengeluaran)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
