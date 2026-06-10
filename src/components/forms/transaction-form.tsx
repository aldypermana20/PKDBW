"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TransactionForm() {
  const [loading, setLoading] = useState(false)

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipe Transaksi</Label>
          <select id="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="expense">Pengeluaran</option>
            <option value="income">Pemasukan</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Tanggal</Label>
          <Input id="date" type="date" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Jumlah (Rp)</Label>
        <Input id="amount" type="number" placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="food">Makanan</option>
          <option value="transport">Transportasi</option>
          <option value="salary">Gaji</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="wallet">Wallet/Rekening</Label>
        <select id="wallet" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="cash">Kas Tunai</option>
          <option value="bank">BCA</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Input id="description" placeholder="Catatan tambahan..." />
      </div>
      <Button type="button" className="w-full" disabled={loading}>
        Simpan Transaksi
      </Button>
    </form>
  )
}
