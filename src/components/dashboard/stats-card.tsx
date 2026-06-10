import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  description?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

export function StatsCard({ title, value, description, icon: Icon, trend, trendValue }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && trendValue && (
          <div className="mt-2 flex items-center text-xs">
            <span className={`font-medium ${
              trend === "up" ? "text-emerald-500" : 
              trend === "down" ? "text-rose-500" : "text-muted-foreground"
            }`}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "−"} {trendValue}
            </span>
            <span className="text-muted-foreground ml-1">dari bulan lalu</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
