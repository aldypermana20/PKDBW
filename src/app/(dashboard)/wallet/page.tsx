export default function WalletPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Wallet & Rekening</h2>
          <p className="text-muted-foreground">
            Kelola dompet dan rekening bank Anda.
          </p>
        </div>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium">
          Tambah Wallet
        </button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card text-card-foreground shadow h-40 flex flex-col items-center justify-center text-muted-foreground">
          Card Wallet 1
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow h-40 flex flex-col items-center justify-center text-muted-foreground">
          Card Wallet 2
        </div>
      </div>
    </div>
  )
}
