export default function KategoriPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kategori</h2>
          <p className="text-muted-foreground">
            Kelola kategori untuk transaksi Anda.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium">
          Tambah Kategori
        </button>
      </div>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6 min-h-[400px] flex items-center justify-center text-muted-foreground">
        Daftar Kategori
      </div>
    </div>
  )
}
