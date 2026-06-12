"use client"

import { useTransactions } from "@/hooks/use-transactions"
import { AddTransactionModal } from "@/components/transaksi/add-transaction-modal"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function TransaksiPage() {
  const { transactions, loading, deleteTransaction } = useTransactions()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transaksi</h2>
          <p className="text-muted-foreground">
            Kelola semua pemasukan dan pengeluaran Anda.
          </p>
        </div>
        <AddTransactionModal />
      </div>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">
            Memuat data transaksi...
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Belum ada transaksi. Tambahkan transaksi pertama Anda!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Keterangan</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead className="text-right">Nominal</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(t.date).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="font-medium">{t.description}</TableCell>
                    <TableCell>{t.category?.name || '-'}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        t.type === 'income' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'
                      }`}>
                        {t.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                      </span>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : ''
                    }`}>
                      {t.type === 'income' ? '+' : '-'}Rp {t.amount.toLocaleString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => {
                          if (confirm('Yakin ingin menghapus transaksi ini?')) {
                            deleteTransaction(t.id)
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
