"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowRightLeft, 
  PieChart, 
  Settings, 
  Tags,
  LogOut
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-primary",
  },
  {
    label: "Transaksi",
    icon: ArrowRightLeft,
    href: "/transaksi",
    color: "text-blue-500",
  },
  {
    label: "Kategori",
    icon: Tags,
    href: "/kategori",
    color: "text-orange-500",
  },
  {
    label: "Wallet",
    icon: Wallet,
    href: "/wallet",
    color: "text-emerald-500",
  },
  {
    label: "Anggaran",
    icon: PieChart,
    href: "/anggaran",
    color: "text-purple-500",
  },
  {
    label: "Laporan",
    icon: PieChart,
    href: "/laporan",
    color: "text-pink-500",
  },
  {
    label: "Pengaturan",
    icon: Settings,
    href: "/pengaturan",
    color: "text-slate-500",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card text-card-foreground border-r border-border">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="rounded-full bg-primary/10 p-2 mr-3">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold">UangKu</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition ${
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center flex-1">
                <route.icon className={`h-5 w-5 mr-3 ${route.color}`} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <button
          onClick={handleLogout}
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-destructive hover:bg-destructive/10 rounded-lg transition text-muted-foreground"
        >
          <div className="flex items-center flex-1">
            <LogOut className="h-5 w-5 mr-3 text-destructive" />
            Keluar
          </div>
        </button>
      </div>
    </div>
  )
}
