export default function AnggaranPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Anggaran</h2>
          <p className="text-muted-foreground">
            Atur dan pantau batas pengeluaran Anda per kategori.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium">
          Buat Anggaran
        </button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 h-48 flex flex-col items-center justify-center text-muted-foreground">
          Progress Anggaran Makanan
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 h-48 flex flex-col items-center justify-center text-muted-foreground">
          Progress Anggaran Transportasi
        </div>
      </div>
    </div>
  )
}
