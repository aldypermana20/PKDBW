export default function TransaksiPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transaksi</h2>
          <p className="text-muted-foreground">
            Kelola semua pemasukan dan pengeluaran Anda.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium">
          Tambah Transaksi
        </button>
      </div>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6 min-h-[500px] flex items-center justify-center text-muted-foreground">
        Tabel Transaksi
      </div>
    </div>
  )
}
