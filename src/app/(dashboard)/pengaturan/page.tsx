export default function PengaturanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground">
          Kelola profil dan preferensi akun Anda.
        </p>
      </div>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow max-w-2xl">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-medium">Profil</h3>
          <p className="text-sm text-muted-foreground mb-4">Perbarui informasi profil Anda.</p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Lengkap</label>
              <input type="text" className="w-full p-2 border border-border rounded-md bg-background" placeholder="Nama Anda" />
            </div>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm">
              Simpan Perubahan
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium text-destructive">Zona Berbahaya</h3>
          <p className="text-sm text-muted-foreground mb-4">Tindakan yang tidak dapat dibatalkan.</p>
          
          <button className="bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20 px-4 py-2 rounded-md font-medium text-sm">
            Hapus Akun
          </button>
        </div>
      </div>
    </div>
  )
}
