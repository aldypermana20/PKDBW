"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTransactions } from "@/hooks/use-transactions"
import { useCategories } from "@/hooks/use-categories"
import { toast } from "sonner"
import { TransactionType } from "@/types/database"

interface AddTransactionModalProps {
  onSuccess?: () => void
}

export function AddTransactionModal({ onSuccess }: AddTransactionModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Form state
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<TransactionType>("expense")
  const [categoryId, setCategoryId] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const { addTransaction } = useTransactions()
  const { categories } = useCategories()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || !categoryId || !description || !date) {
      toast.error("Mohon lengkapi semua data")
      return
    }

    try {
      setLoading(true)
      await addTransaction({
        amount: parseFloat(amount),
        type,
        category_id: categoryId,
        description,
        date,
      })
      
      toast.success("Transaksi berhasil ditambahkan")
      setOpen(false)
      
      // Reset form
      setAmount("")
      setDescription("")
      
      if (onSuccess) onSuccess()
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Gagal menambahkan transaksi")
    } finally {
      setLoading(false)
    }
  }

  const filteredCategories = categories.filter(c => c.type === type)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Tambah Transaksi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Transaksi Baru</DialogTitle>
            <DialogDescription>
              Masukkan detail pemasukan atau pengeluaran Anda. Klik simpan setelah selesai.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipe
              </Label>
              <div className="col-span-3">
                <Select value={type} onValueChange={(v) => setType(v as TransactionType)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Pilih Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Pemasukan (+)</SelectItem>
                    <SelectItem value="expense">Pengeluaran (-)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Nominal
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Rp 0"
                className="col-span-3"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="any"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Kategori
              </Label>
              <div className="col-span-3">
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>Belum ada kategori untuk tipe ini</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Tanggal
              </Label>
              <Input
                id="date"
                type="date"
                className="col-span-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Keterangan
              </Label>
              <Input
                id="description"
                placeholder="Contoh: Makan Siang"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Transaksi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
