export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Laporan</h2>
          <p className="text-muted-foreground">
            Analisis dan statistik keuangan Anda secara mendalam.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium">
          Export CSV
        </button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 h-80 flex flex-col items-center justify-center text-muted-foreground">
          Pie Chart Pengeluaran
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 h-80 flex flex-col items-center justify-center text-muted-foreground">
          Bar Chart Pemasukan vs Pengeluaran
        </div>
      </div>
    </div>
  )
}
