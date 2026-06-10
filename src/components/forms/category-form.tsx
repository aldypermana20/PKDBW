"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CategoryForm() {
  const [loading, setLoading] = useState(false)

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nama Kategori</Label>
        <Input id="name" placeholder="Misal: Belanja Bulanan" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Tipe Kategori</Label>
        <select id="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="expense">Pengeluaran</option>
          <option value="income">Pemasukan</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">Ikon (Emoji)</Label>
          <Input id="icon" placeholder="🛒" defaultValue="💰" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Warna</Label>
          <Input id="color" type="color" defaultValue="#10B981" className="h-10 p-1" />
        </div>
      </div>
      <Button type="button" className="w-full" disabled={loading}>
        Simpan Kategori
      </Button>
    </form>
  )
}
