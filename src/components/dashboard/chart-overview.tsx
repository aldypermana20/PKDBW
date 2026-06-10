"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { name: "Jan", pemasukan: 4000, pengeluaran: 2400 },
  { name: "Feb", pemasukan: 3000, pengeluaran: 1398 },
  { name: "Mar", pemasukan: 2000, pengeluaran: 9800 },
  { name: "Apr", pemasukan: 2780, pengeluaran: 3908 },
  { name: "Mei", pemasukan: 1890, pengeluaran: 4800 },
  { name: "Jun", pemasukan: 2390, pengeluaran: 3800 },
  { name: "Jul", pemasukan: 3490, pengeluaran: 4300 },
]

export function ChartOverview() {
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
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              tickFormatter={(value) => `Rp${value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))" }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Area 
              type="monotone" 
              dataKey="pemasukan" 
              stroke="#10B981" 
              fillOpacity={1} 
              fill="url(#colorPemasukan)" 
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="pengeluaran" 
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
