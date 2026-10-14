import React from 'react';
import { HelpCircle, Wallet, Plus, Target, PieChart, ShieldCheck } from 'lucide-react';

export const PanduanPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-comic tracking-wide text-[#171717] uppercase drop-shadow-[1px_1px_0px_#FFFFFF]">BUKU PANDUAN</h1>
          <p className="text-sm font-bold text-[#777777]">Cara rahasia menjadi pahlawan finansial!</p>
        </div>
      </div>

      {/* Intro */}
      <div className="comic-panel p-6 bg-[#FFD83D] relative overflow-hidden">
        <div className="halftone-bg absolute inset-0 pointer-events-none opacity-30"></div>
        <div className="relative z-10 flex gap-4 items-start">
          <HelpCircle className="w-12 h-12 text-[#171717] shrink-0 transform -rotate-12" strokeWidth={2.5} />
          <div>
            <h2 className="text-2xl font-bangers tracking-wide uppercase mb-2">Selamat Datang di FinTrack!</h2>
            <p className="font-space-grotesk font-bold text-[#171717]/80 leading-relaxed">
              Ini adalah markas rahasia Anda untuk mencatat dan membasmi pengeluaran jahat. Ikuti buku panduan ini agar Anda bisa menguasai aplikasi ini sepenuhnya!
            </p>
          </div>
        </div>
      </div>

      {/* Apa itu FinTrack */}
      <div className="comic-panel p-6 bg-white relative">
        <h2 className="text-2xl font-bangers tracking-wide uppercase mb-3 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#35A66F]" strokeWidth={3} />
          Sebenarnya, Apa itu FinTrack?
        </h2>
        <div className="space-y-3 font-space-grotesk font-bold text-sm text-[#171717]/80 leading-relaxed">
          <p>
            Bayangkan FinTrack sebagai <strong>buku catatan ajaib</strong> untuk uangmu. Pernah merasa bingung <em>"Loh, perasaan baru gajian, kok uangnya udah habis aja ya?"</em> Nah, di situlah FinTrack bekerja!
          </p>
          <p>
            Kamu cukup mencatat setiap kali dapat uang (misal: gaji, dikasih orang tua) dan setiap kali ngeluarin uang (misal: beli kopi, bayar kos, belanja). Nanti, FinTrack yang akan <strong>otomatis menghitung sisa uangmu</strong> dan merangkumnya menjadi grafik yang cantik.
          </p>
          <p>
            Singkatnya, FinTrack adalah <strong>asisten keuangan pribadimu</strong> agar kamu tidak gampang bokek di akhir bulan!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Panduan 1: Dompet */}
        <div className="comic-panel p-6 bg-white space-y-4">
          <div className="flex items-center gap-3 border-b-4 border-[#171717] pb-4">
            <div className="w-10 h-10 bg-[#3478F6] border-2 border-[#171717] flex items-center justify-center text-white transform -rotate-3">
              <Wallet className="w-5 h-5" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bangers tracking-wider uppercase">1. Bikin Dompet Dulu!</h3>
          </div>
          <p className="font-space-grotesk font-bold text-sm text-[#171717]/80 leading-relaxed">
            Sebelum mencatat pengeluaran, Anda harus punya "wadah" uangnya. Buka menu <strong>Dompet (Wallet)</strong> di samping, lalu tambahkan dompet seperti "BCA", "Gopay", atau "Dompet Tunai" beserta saldo awalnya.
          </p>
        </div>

        {/* Panduan 2: Transaksi */}
        <div className="comic-panel p-6 bg-white space-y-4">
          <div className="flex items-center gap-3 border-b-4 border-[#171717] pb-4">
            <div className="w-10 h-10 bg-[#4ADE80] border-2 border-[#171717] flex items-center justify-center text-[#171717] transform rotate-3">
              <Plus className="w-5 h-5" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bangers tracking-wider uppercase">2. Catat Transaksi!</h3>
          </div>
          <p className="font-space-grotesk font-bold text-sm text-[#171717]/80 leading-relaxed">
            Pemasukan atau pengeluaran? Tekan tombol <strong>"Catat"</strong> di kanan atas atau buka menu Transaksi. Pilih dompet mana yang uangnya terpakai/bertambah, lalu pilih kategorinya!
          </p>
        </div>

        {/* Panduan 3: Anggaran */}
        <div className="comic-panel p-6 bg-white space-y-4">
          <div className="flex items-center gap-3 border-b-4 border-[#171717] pb-4">
            <div className="w-10 h-10 bg-[#EF4444] border-2 border-[#171717] flex items-center justify-center text-white transform -rotate-6">
              <Target className="w-5 h-5" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bangers tracking-wider uppercase">3. Apa Itu Anggaran?</h3>
          </div>
          <p className="font-space-grotesk font-bold text-sm text-[#171717]/80 leading-relaxed">
            <strong>Anggaran (Budget)</strong> adalah "Batas Maksimal" jajan bulanan Anda per kategori.
            <br /><br />
            <strong>Cara Kerjanya:</strong> Buka menu Anggaran, buat batas (misal: "Makanan = Rp1.000.000"). Setiap kali Anda mencatat pengeluaran "Makanan", bar anggarannya akan otomatis terisi. Kalau merah, artinya Anda sudah boros!
          </p>
        </div>

        {/* Panduan 4: Laporan */}
        <div className="comic-panel p-6 bg-white space-y-4">
          <div className="flex items-center gap-3 border-b-4 border-[#171717] pb-4">
            <div className="w-10 h-10 bg-[#A855F7] border-2 border-[#171717] flex items-center justify-center text-white transform rotate-6">
              <PieChart className="w-5 h-5" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bangers tracking-wider uppercase">4. Pantau Laporan</h3>
          </div>
          <p className="font-space-grotesk font-bold text-sm text-[#171717]/80 leading-relaxed">
            Di akhir bulan, buka menu <strong>Laporan</strong>. Di sana Anda bisa melihat grafik canggih kemana saja uang Anda bocor bulan ini. Ini penting untuk evaluasi strategi bulan depan!
          </p>
        </div>

      </div>
    </div>
  );
};
