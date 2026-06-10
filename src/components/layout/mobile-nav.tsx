"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "./sidebar"
import { useState } from "react"
import Link from "next/link"
import { Wallet } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
        <Menu className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" className="md:hidden relative z-50" onClick={() => setOpen(false)}>
        <Menu className="h-6 w-6" />
      </Button>
      
      <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
      
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-card shadow-lg transition-transform duration-300 ease-in-out">
        <div className="h-full" onClick={() => setOpen(false)}>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
