import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wallet as WalletIcon,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Layers,
  ChevronRight,
  Plus,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { useFinancial } from '../context/FinancialContext';
import { IconResolver } from '../components/common/IconResolver';

export const DashboardPage: React.FC = () => {
  const { summary, transactions, wallets, budgets, formatCurrency } = useFinancial();

  // Prepare chart data for Income vs Expense
  const chartData = [
    { day: 'Sen', Pemasukan: 500000, Pengeluaran: 250000 },
    { day: 'Sel', Pemasukan: 1500000, Pengeluaran: 450000 },
    { day: 'Rab', Pemasukan: 200000, Pengeluaran: 120000 },
    { day: 'Kam', Pemasukan: 800000, Pengeluaran: 600000 },
    { day: 'Jum', Pemasukan: 15000000, Pengeluaran: 1100000 },
    { day: 'Sab', Pemasukan: 300000, Pengeluaran: 950000 },
    { day: 'Min', Pemasukan: 1200000, Pengeluaran: 300000 },
  ];

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="comic-panel-yellow p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="halftone-bg absolute inset-0 pointer-events-none"></div>
        <div className="relative z-10 space-y-3">
          <div className="comic-badge inline-flex items-center gap-2 px-4 py-1.5 bg-white text-[#171717] text-xs">
            <Calendar className="w-4 h-4" strokeWidth={3} />
            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-comic text-[#171717] uppercase tracking-wide drop-shadow-[2px_2px_0px_#FFFFFF]">
            Markas Utama
          </h1>
          <p className="text-sm font-bold text-[#171717] max-w-xl">
            Laporan misi keuangan Anda hari ini! Pantau arus kas, aset, dan pastikan target tabungan tercapai!
          </p>
        </div>
      </div>

      {/* Overview Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Balance Card */}
        <div className="comic-panel p-5 relative group overflow-hidden bg-white">
          <div className="absolute -right-4 -top-4 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform">
            <WalletIcon className="w-32 h-32 text-[#171717]" />
          </div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-xs font-black uppercase text-[#171717] bg-[#FFD83D] px-2 py-1 border-2 border-[#171717]">Total Saldo</span>
            <div className="w-10 h-10 bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center">
              <WalletIcon className="w-5 h-5 text-[#3478F6]" strokeWidth={2.5} />
            </div>
          </div>
          <div className="text-3xl font-numbers font-bold text-[#171717] mb-2 relative z-10 tracking-tight">
            {formatCurrency(summary.totalBalance)}
          </div>
          <div className="text-xs font-bold text-[#777777] relative z-10">
            Di <span className="text-[#3478F6] font-black">{wallets.length} Dompet</span>
          </div>
        </div>

        {/* Total Income Card */}
        <div className="comic-panel p-5 relative overflow-hidden bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase text-[#171717] bg-[#35A66F] text-white px-2 py-1 border-2 border-[#171717]">Pemasukan</span>
            <div className="w-10 h-10 bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-[#35A66F]" strokeWidth={3} />
            </div>
          </div>
          <div className="text-3xl font-numbers font-bold text-[#35A66F] mb-2 tracking-tight">
            {formatCurrency(summary.totalIncome)}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#171717]">
            <TrendingUp className="w-4 h-4 text-[#35A66F]" strokeWidth={3} />
          </div>
        </div>

        {/* Total Expense Card */}
        <div className="comic-panel p-5 relative overflow-hidden bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase text-white bg-[#EF4444] px-2 py-1 border-2 border-[#171717]">Pengeluaran</span>
            <div className="w-10 h-10 bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-[#EF4444]" strokeWidth={3} />
            </div>
          </div>
          <div className="text-3xl font-numbers font-bold text-[#EF4444] mb-2 tracking-tight">
            {formatCurrency(summary.totalExpense)}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#171717]">
            <TrendingDown className="w-4 h-4 text-[#EF4444]" strokeWidth={3} />
          </div>
        </div>

        {/* Net Savings Card */}
        <div className="comic-panel-blue p-5 relative overflow-hidden">
          <div className="halftone-bg absolute inset-0 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-xs font-black uppercase text-[#171717] bg-[#FFD83D] px-2 py-1 border-2 border-[#171717]">Tabungan Bersih</span>
            <div className="w-10 h-10 bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center">
              <PiggyBank className="w-5 h-5 text-[#3478F6]" strokeWidth={2.5} />
            </div>
          </div>
          <div className="text-3xl font-numbers font-bold text-white mb-2 relative z-10 tracking-tight drop-shadow-[2px_2px_0px_#171717]">
            {formatCurrency(summary.netSavings)}
          </div>
          <div className="text-xs font-bold text-white relative z-10 opacity-90">
            Arus kas positif
          </div>
        </div>
      </div>

      {/* Analytics Chart & Wallet Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Financial Trend Chart */}
        <div className="lg:col-span-2 comic-panel p-6 bg-white flex flex-col">
          <div className="flex items-center justify-between mb-6 border-b-4 border-[#171717] pb-4">
            <div>
              <h2 className="text-2xl font-comic tracking-wide text-[#171717] uppercase">Radar Keuangan</h2>
              <p className="text-sm font-bold text-[#777777]">Pantauan mingguan misi Anda</p>
            </div>
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-2 bg-[#FFF9E9] border-2 border-[#171717] px-2 py-1">
                <span className="w-3 h-3 bg-[#35A66F] border-2 border-[#171717]" />
                <span className="uppercase tracking-wider">In</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FFF9E9] border-2 border-[#171717] px-2 py-1">
                <span className="w-3 h-3 bg-[#EF4444] border-2 border-[#171717]" />
                <span className="uppercase tracking-wider">Out</span>
              </div>
            </div>
          </div>

          <div className="flex-1 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="0" stroke="#171717" vertical={false} />
                <XAxis dataKey="day" stroke="#171717" tick={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'Space Grotesk' }} tickLine={false} axisLine={{ strokeWidth: 2 }} />
                <YAxis stroke="#171717" tick={{ fontSize: 12, fontWeight: 'bold', fontFamily: 'Space Grotesk' }} tickLine={false} axisLine={false} width={80} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '3px solid #171717', boxShadow: '4px 4px 0px 0px #171717', borderRadius: '0', fontWeight: 'bold' }}
                  itemStyle={{ color: '#171717', fontFamily: 'Space Grotesk' }}
                  formatter={(value: any) => [formatCurrency(Number(value)), '']}
                />
                <Area type="step" dataKey="Pemasukan" stroke="#171717" strokeWidth={3} fillOpacity={1} fill="#35A66F" activeDot={{ r: 6, stroke: '#171717', strokeWidth: 3 }} />
                <Area type="step" dataKey="Pengeluaran" stroke="#171717" strokeWidth={3} fillOpacity={1} fill="#EF4444" activeDot={{ r: 6, stroke: '#171717', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wallet Balance Cards */}
        <div className="comic-panel p-6 bg-[#FFF9E9] flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b-4 border-[#171717] pb-4">
            <h2 className="text-2xl font-comic tracking-wide text-[#171717] uppercase">Dompet</h2>
            <span className="text-xs font-black bg-white border-2 border-[#171717] px-2 py-1 shadow-[2px_2px_0px_0px_#171717]">
              {wallets.length} AKTIF
            </span>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto max-h-72 pr-2">
            {wallets.map((w) => (
              <div
                key={w.id}
                className="p-3 bg-white border-3 border-[#171717] shadow-[4px_4px_0px_0px_#171717] flex items-center justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#171717] transition-all cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 border-2 border-[#171717] flex items-center justify-center font-bold text-[#171717] text-xs"
                    style={{ backgroundColor: w.color || '#FFD83D' }}
                  >
                    {w.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#171717] uppercase">{w.name}</h3>
                    <p className="text-[10px] text-[#777777] font-bold uppercase tracking-wider">{w.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-numbers font-bold text-[#171717]">{formatCurrency(w.balance)}</p>
                  {w.account_number && (
                    <p className="text-[10px] font-bold text-[#777777]">#{w.account_number.slice(-4)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions & Budget Progress Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions List */}
        <div className="lg:col-span-2 comic-panel p-6 bg-white space-y-4">
          <div className="flex items-center justify-between border-b-4 border-[#171717] pb-4 mb-2">
            <h2 className="text-2xl font-comic tracking-wide text-[#171717] uppercase">Log Aktivitas</h2>
            <button className="text-xs font-black uppercase text-[#3478F6] hover:text-[#EF4444] transition-colors underline decoration-2 underline-offset-4">
              Lihat Semua
            </button>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3 bg-[#FFF9E9] border-3 border-[#171717] shadow-[4px_4px_0px_0px_#171717] flex items-center justify-between relative"
              >
                {/* Stamp effect for comic log */}
                <div className="absolute -top-3 -right-2 transform rotate-12 opacity-80">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 border-2 border-[#171717] ${tx.type === 'income' ? 'bg-[#35A66F] text-white' : 'bg-[#EF4444] text-white'}`}>
                    {tx.type === 'income' ? 'IN' : 'OUT'}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 border-2 border-[#171717] flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_#171717]`}
                  >
                    <IconResolver name={tx.category_icon || 'Tag'} className={`w-6 h-6 ${tx.type === 'income' ? 'text-[#35A66F]' : 'text-[#EF4444]'}`} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#171717] uppercase tracking-wide">{tx.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#777777] mt-1">
                      <span className="uppercase">{tx.category_name}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#171717]"></span>
                      <span className="uppercase">{tx.date}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right pr-4">
                  <p
                    className={`text-lg font-numbers font-black drop-shadow-[1px_1px_0px_#171717] ${tx.type === 'income' ? 'text-[#35A66F]' : 'text-[#EF4444]'
                      }`}
                  >
                    {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Progress Quick Widget */}
        <div className="comic-panel p-6 bg-white space-y-4">
          <div className="flex items-center justify-between border-b-4 border-[#171717] pb-4 mb-2">
            <h2 className="text-2xl font-comic tracking-wide text-[#171717] uppercase">Misi Anggaran</h2>
          </div>

          <div className="space-y-6">
            {budgets.map((b) => {
              const percentage = Math.min(100, Math.round((b.current_spent / b.limit_amount) * 100));
              const isOverBudget = percentage >= 90;

              return (
                <div key={b.id} className="space-y-2 relative">
                  {isOverBudget && (
                    <div className="absolute -top-3 -right-2 z-10 speech-bubble px-2 py-1 bg-white text-[10px] font-black text-[#EF4444] uppercase transform rotate-6">
                      Awas jebol!
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-[#171717] flex items-center gap-1.5 uppercase">
                      <IconResolver name={b.category_icon || 'Tag'} className="w-4 h-4 text-[#171717]" strokeWidth={3} />
                      {b.category_name}
                    </span>
                    <span className="font-numbers font-bold text-[#171717]">
                      {formatCurrency(b.current_spent)} / {formatCurrency(b.limit_amount)}
                    </span>
                  </div>
                  <div className="w-full h-4 bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] relative">
                    <div
                      className={`h-full border-r-2 border-[#171717] ${isOverBudget
                        ? 'bg-[#EF4444]'
                        : 'bg-[#FFD83D]'
                        }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
