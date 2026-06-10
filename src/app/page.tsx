import Link from "next/link"
import { ArrowRight, PieChart, Shield, Smartphone, Wallet } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center gap-2" href="#">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">UangKu</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors flex items-center" href="/login">
            Masuk
          </Link>
          <Link
            className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
            href="/register"
          >
            Daftar Gratis
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Kendalikan Keuangan Anda <br className="hidden sm:inline" />
                  <span className="text-primary">Mulai Hari Ini</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Pencatat Keuangan Digital adalah solusi cerdas untuk melacak pemasukan, pengeluaran, dan merencanakan anggaran masa depan Anda.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  href="/register"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Mulai Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3">
              <div className="flex flex-col justify-center space-y-4 border rounded-xl p-6 shadow-sm bg-background">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <PieChart className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Laporan & Analitik</h3>
                  <p className="text-muted-foreground">
                    Lihat kemana uang Anda pergi dengan grafik dan statistik yang mudah dipahami.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col justify-center space-y-4 border rounded-xl p-6 shadow-sm bg-background">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Bisa Di-Install (PWA)</h3>
                  <p className="text-muted-foreground">
                    Install aplikasi kami di smartphone Anda dan catat pengeluaran di mana saja, kapan saja.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col justify-center space-y-4 border rounded-xl p-6 shadow-sm bg-background">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Data Aman & Privat</h3>
                  <p className="text-muted-foreground">
                    Data keuangan Anda tersimpan dengan aman dengan enkripsi tingkat tinggi di Supabase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} UangKu. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Syarat Ketentuan
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privasi
          </Link>
        </nav>
      </footer>
    </div>
  )
}
