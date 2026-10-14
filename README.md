# 💰 Pencatat Keuangan Digital (Vite + React + TypeScript)

Aplikasi Web **Pencatat Keuangan Digital** yang modern, cepat, dan responsif. Dibangun dengan **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Recharts**, dan disiapkan secara penuh untuk di-deploy ke **Vercel** dengan integrasi **Supabase Database**.

---

## ⚡ Fitur Utama

- 📊 **Dashboard Analisis**: Ringkasan Total Saldo, Pemasukan, Pengeluaran, Net Tabungan, dan Grafik Tren Arus Kas Mingguan (Recharts).
- 💸 **Pencatatan Transaksi**: Catat transaksi Pemasukan dan Pengeluaran dengan modal responsif, pilihan Kategori, Dompet, dan Catatan.
- 🔍 **Filter & Pencarian**: Filter transaksi berdasarkan Jenis (Income/Expense), Kategori, Dompet, serta Kata Kunci Pencarian.
- 🏦 **Manajemen Wallet / Rekening**: Dukungan untuk Bank BCA, Mandiri, E-Wallet (GoPay/OVO/ShopeePay), dan Cash/Tunai.
- 🎯 **Target Anggaran (Budgeting)**: Batas alokasi pengeluaran per kategori dengan indikator persentase & peringatan otomatis.
- 📈 **Laporan & Ekspor Data**: Visualisasi Pie Chart persentase pengeluaran dan ekspor transaksi ke format **CSV**.
- 💱 **Multi-Currency Support**: Switcher langsung antara **IDR (Rupiah)** dan **USD (Dollar)**.
- 🌐 **Vercel Ready**: Dilengkapi file `vercel.json` untuk penanganan Single Page Application (SPA) Client Routing.

---

## 🚀 Panduan Memulai (Pengembangan Lokal)

### 1. Prasyarat
- Node.js (v18+)
- npm atau pnpm

### 2. Instalasi & Pengoperasian
```bash
# Clone atau buka direktori proyek
cd pencatat-keuangan

# Jalankan server pengembangan lokal (Vite Dev Server)
npm run dev
```
Buka browser di `http://localhost:3000`

### 3. Skrip Build Produksi
```bash
# Kompilasi TypeScript & bundling Vite
npm run build

# Preview build produksi secara lokal
npm run preview
```

---

## ☁️ Panduan Deploy ke Vercel

Proyek ini telah dikonfigurasi untuk pengunggahan instan ke **Vercel**:

1. **Push ke GitHub / GitLab**:
   ```bash
   git add .
   git commit -m "Migrasi ke React + TypeScript (Vite) & Kesiapan Vercel"
   git push origin main
   ```
2. **Import ke Vercel**:
   - Buka [Vercel Dashboard](https://vercel.com/dashboard) -> **Add New Project**.
   - Pilih repository GitHub ini.
   - **Framework Preset**: Pilih **Vite**.
   - **Build Command**: `npm run build` (atau `tsc -b && vite build`)
   - **Output Directory**: `dist`
3. **Environment Variables (Opsional untuk Supabase Sync)**:
   Tambahkan variabel lingkungan di panel Vercel Settings:
   - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-anon-key`

---

## 🛠️ Stack Teknologi

- **Core**: React 19, TypeScript, Vite 6
- **Routing**: `react-router-dom` v7
- **Styling**: Tailwind CSS v4, Lucide React, Glassmorphism UI
- **Chart**: Recharts
- **Database Backend**: Supabase JS Client (`@supabase/supabase-js`)
