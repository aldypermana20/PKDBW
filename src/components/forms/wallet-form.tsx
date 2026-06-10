"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function WalletForm() {
  const [loading, setLoading] = useState(false)

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nama Wallet/Rekening</Label>
        <Input id="name" placeholder="Misal: BCA, Kas Tunai, OVO" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="balance">Saldo Awal (Rp)</Label>
        <Input id="balance" type="number" placeholder="0" defaultValue="0" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon">Ikon (Emoji)</Label>
          <Input id="icon" placeholder="💳" defaultValue="💳" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">Warna</Label>
          <Input id="color" type="color" defaultValue="#3B82F6" className="h-10 p-1" />
        </div>
      </div>
      <Button type="button" className="w-full" disabled={loading}>
        Simpan Wallet
      </Button>
    </form>
  )
}
