"use client"

import { MobileNav } from "./mobile-nav"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase])

  return (
    <div className="flex items-center justify-between p-4 bg-card border-b border-border shadow-sm">
      <div className="md:hidden">
        <MobileNav />
      </div>
      
      <div className="flex w-full justify-end items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <div className="flex items-center gap-x-2">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">{user?.user_metadata?.full_name || user?.email}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </div>
  )
}
