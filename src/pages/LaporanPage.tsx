import React from 'react';
import { Download, FileSpreadsheet, PieChart as PieIcon, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useFinancial } from '../context/FinancialContext';

export const LaporanPage: React.FC = () => {
  const { transactions, categories, summary, formatCurrency } = useFinancial();

  // Calculate Expense by Category
  const expenseByCategoryMap: Record<string, number> = {};
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      expenseByCategoryMap[t.category_name] = (expenseByCategoryMap[t.category_name] || 0) + t.amount;
    });

  const pieData = Object.entries(expenseByCategoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#3478F6', '#EF4444', '#35A66F', '#FFD83D', '#9333EA', '#F97316', '#171717'];

  const exportToCSV = () => {
    const headers = ['ID,Judul,Nominal,Tipe,Kategori,Dompet,Tanggal,Catatan\n'];
    const rows = transactions.map((t) =>
      `"${t.id}","${t.title}",${t.amount},"${t.type}","${t.category_name}","${t.wallet_name}","${t.date}","${t.notes || ''}"`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + headers.concat(rows).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Keuangan_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-comic tracking-wide text-[#171717] uppercase drop-shadow-[1px_1px_0px_#FFFFFF]">Laporan Akhir</h1>
          <p className="text-sm font-bold text-[#777777]">Analisis misi dan unduh rekapan arsip.</p>
        </div>
        <button
          onClick={exportToCSV}
          className="comic-button flex items-center gap-2 px-5 py-3 bg-[#35A66F] text-white hover:-translate-y-1"
        >
          <Download className="w-5 h-5" strokeWidth={3} />
          <span>Ekspor Arsip (CSV)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart Breakdown */}
        <div className="lg:col-span-2 comic-panel p-6 bg-white flex flex-col h-full">
          <h2 className="text-2xl font-comic tracking-wide text-[#171717] uppercase border-b-4 border-[#171717] pb-4 mb-4 flex items-center gap-3">
            <PieIcon className="w-6 h-6" strokeWidth={3} />
            Persentase Arus Keluar
          </h2>

          <div className="w-full h-[400px] mt-4 relative">
            {pieData.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center font-bold text-[#777777] uppercase text-sm border-4 border-dashed border-[#171717] bg-[#FFF9E9]">
                Belum ada data pengeluaran misi.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="#171717"
                    strokeWidth={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#FFFFFF', border: '3px solid #171717', boxShadow: '4px 4px 0px 0px #171717', borderRadius: '0', fontWeight: 'bold' }}
                    itemStyle={{ color: '#171717', fontFamily: 'Space Grotesk' }}
                    formatter={(val: any) => [formatCurrency(Number(val)), 'Nominal']}
                  />
                  <Legend wrapperStyle={{ fontFamily: 'Inter', fontWeight: 'bold', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Financial Health Summary */}
        <div className="comic-panel p-6 bg-white space-y-6">
          <h2 className="text-2xl font-comic tracking-wide text-[#171717] uppercase border-b-4 border-[#171717] pb-4">
            Kesehatan Misi
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-[#FFD83D] border-3 border-[#171717] shadow-[4px_4px_0px_0px_#171717] hover:-translate-y-1 transition-transform">
              <span className="text-[10px] font-black uppercase text-[#171717] block mb-1">Rasio Selamat (Net)</span>
              <span className="text-3xl font-numbers font-black text-[#171717] drop-shadow-[1px_1px_0px_#FFFFFF]">
                {summary.totalIncome > 0
                  ? Math.round((summary.netSavings / summary.totalIncome) * 100)
                  : 0}%
              </span>
              <p className="text-[10px] font-bold text-[#171717] mt-1 bg-white border-2 border-[#171717] inline-block px-1.5 py-0.5">
                Pemasukan yang berhasil diamankan.
              </p>
            </div>

            <div className="p-4 bg-[#FFF9E9] border-3 border-[#171717] shadow-[4px_4px_0px_0px_#171717]">
              <span className="text-[10px] font-black uppercase text-[#777777] block mb-1">Total Pemasukan Misi</span>
              <span className="text-2xl font-numbers font-black text-[#35A66F]">{formatCurrency(summary.totalIncome)}</span>
            </div>

            <div className="p-4 bg-[#FFF9E9] border-3 border-[#171717] shadow-[4px_4px_0px_0px_#171717]">
              <span className="text-[10px] font-black uppercase text-[#777777] block mb-1">Total Pengeluaran Misi</span>
              <span className="text-2xl font-numbers font-black text-[#EF4444]">{formatCurrency(summary.totalExpense)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
