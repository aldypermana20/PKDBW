import React, { useState, useMemo, useEffect } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { IconResolver } from '../components/common/IconResolver';
import { CalendarDays, AlertTriangle, CheckCircle2, TrendingDown, TrendingUp, Edit3, Save, Check } from 'lucide-react';
import { TransactionType } from '../types';

export const PlannerPage: React.FC = () => {
  const { transactions, wallets, categories, monthlyBudget, setMonthlyBudget, addTransaction, formatCurrency } = useFinancial();

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(monthlyBudget.toString());

  const [quickTitle, setQuickTitle] = useState('');
  const [quickAmount, setQuickAmount] = useState('');
  const [quickType, setQuickType] = useState<TransactionType>('expense');
  const [quickWalletId, setQuickWalletId] = useState('');
  const [quickCategoryId, setQuickCategoryId] = useState('');

  // Sync wallet
  useEffect(() => {
    if (wallets.length > 0 && !quickWalletId) setQuickWalletId(wallets[0].id);
  }, [wallets, quickWalletId]);

  // Sync category when type changes
  useEffect(() => {
    const available = categories.filter(c => c.type === quickType);
    if (available.length > 0) {
      setQuickCategoryId(available[0].id);
    } else {
      setQuickCategoryId('');
    }
  }, [quickType, categories]);

  const todayDate = new Date();
  const tzOffset = todayDate.getTimezoneOffset() * 60000;
  const todayStr = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];

  const todayTransactions = useMemo(() => {
    return transactions.filter(t => t.date === todayStr);
  }, [transactions, todayStr]);

  const todayExpense = todayTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const todayIncome = todayTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const daysInMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0).getDate();
  const currentDay = todayDate.getDate();

  const dailySafeLimit = monthlyBudget > 0 ? monthlyBudget / daysInMonth : 0;
  const isOverBudget = monthlyBudget > 0 && todayExpense > dailySafeLimit;

  const currentMonthExpense = useMemo(() => {
    return transactions.filter(t => {
      const d = new Date(t.date);
      return t.type === 'expense' &&
             d.getMonth() === todayDate.getMonth() &&
             d.getFullYear() === todayDate.getFullYear();
    }).reduce((acc, t) => acc + t.amount, 0);
  }, [transactions, todayDate]);

  const remainingMonthlyBudget = monthlyBudget - currentMonthExpense;
  const weeklyTarget = monthlyBudget / 4; 
  const remainingDays = daysInMonth - currentDay + 1;
  const dynamicDailySafeLimit = remainingDays > 0 ? remainingMonthlyBudget / remainingDays : 0;

  const handleSaveBudget = () => {
    setMonthlyBudget(Number(tempBudget) || 0);
    setIsEditingBudget(false);
  };

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle || !quickAmount || !quickWalletId || !quickCategoryId) return;

    const w = wallets.find(w => w.id === quickWalletId);
    const c = categories.find(c => c.id === quickCategoryId);
    if (!w || !c) return;

    await addTransaction({
      title: quickTitle,
      amount: Number(quickAmount),
      type: quickType,
      category_id: c.id,
      category_name: c.name,
      category_icon: c.icon,
      category_color: c.color,
      wallet_id: w.id,
      wallet_name: w.name,
      date: todayStr,
      notes: 'Ditambahkan via Planner Harian',
    });

    setQuickTitle('');
    setQuickAmount('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-comic tracking-wide text-[#171717] uppercase drop-shadow-[1px_1px_0px_#FFFFFF]">Planner Harian & Bulanan</h1>
          <p className="text-sm font-bold text-[#777777]">Rencanakan keuanganmu, pantau batas harian dan mingguan agar tidak jebol.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kolom Kiri: Tabel Harian */}
        <div className="space-y-6">
          <div className="comic-panel p-6 bg-white space-y-5">
            <div className="flex items-center gap-3 border-b-4 border-[#171717] pb-4">
              <CalendarDays className="w-8 h-8 text-[#171717]" strokeWidth={3} />
              <h2 className="text-2xl font-comic uppercase tracking-wide text-[#171717] mt-1">Status Hari Ini</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FFF9E9] border-2 border-[#171717] p-4 text-center">
                <p className="text-xs font-black uppercase text-[#777777] mb-1">Pengeluaran</p>
                <p className="text-lg font-bold text-[#EF4444]">{formatCurrency(todayExpense)}</p>
              </div>
              <div className="bg-[#FFF9E9] border-2 border-[#171717] p-4 text-center">
                <p className="text-xs font-black uppercase text-[#777777] mb-1">Pemasukan</p>
                <p className="text-lg font-bold text-[#35A66F]">{formatCurrency(todayIncome)}</p>
              </div>
            </div>

            <div className={`p-4 border-4 border-[#171717] shadow-[4px_4px_0px_0px_#171717] flex items-center gap-4 ${isOverBudget ? 'bg-[#FFDEDE]' : 'bg-[#D3F5E4]'}`}>
              {isOverBudget ? (
                <AlertTriangle className="w-10 h-10 text-[#EF4444]" strokeWidth={2.5} />
              ) : (
                <CheckCircle2 className="w-10 h-10 text-[#35A66F]" strokeWidth={2.5} />
              )}
              <div>
                <h3 className="font-comic text-xl uppercase tracking-wide text-[#171717]">
                  {isOverBudget ? 'AWAS! OVER BUDGET!' : 'STATUS AMAN!'}
                </h3>
                <p className="text-sm font-bold text-[#171717]">
                  Batas Harian: {formatCurrency(dailySafeLimit)}
                </p>
              </div>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleQuickAdd} className="bg-[#F0F0F0] border-2 border-[#171717] p-4 space-y-4">
              <h3 className="font-black text-sm uppercase tracking-widest text-[#171717] border-b-2 border-[#171717] pb-2">Catat Cepat (Hari Ini)</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Tipe</label>
                  <select 
                    value={quickType} 
                    onChange={e => setQuickType(e.target.value as TransactionType)}
                    className="w-full px-3 py-2 comic-input text-sm font-bold"
                  >
                    <option value="expense">Pengeluaran</option>
                    <option value="income">Pemasukan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Nominal</label>
                  <input 
                    type="number" 
                    value={quickAmount} 
                    onChange={e => setQuickAmount(e.target.value)} 
                    placeholder="0" 
                    required 
                    className="w-full px-3 py-2 comic-input text-sm font-bold"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Keterangan Singkat</label>
                <input 
                  type="text" 
                  value={quickTitle} 
                  onChange={e => setQuickTitle(e.target.value)} 
                  placeholder="Makan siang, bensin, dll" 
                  required 
                  className="w-full px-3 py-2 comic-input text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Dompet</label>
                  <select 
                    value={quickWalletId} 
                    onChange={e => setQuickWalletId(e.target.value)}
                    className="w-full px-3 py-2 comic-input text-sm font-bold"
                  >
                    {wallets.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Kategori</label>
                  <select 
                    value={quickCategoryId} 
                    onChange={e => setQuickCategoryId(e.target.value)}
                    className="w-full px-3 py-2 comic-input text-sm font-bold"
                  >
                    {categories.filter(c => c.type === quickType).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full comic-button comic-button-primary py-2 uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                <Check className="w-4 h-4" strokeWidth={3} /> Simpan Catatan
              </button>
            </form>
            
            {/* Tabel Transaksi Hari Ini */}
            <div className="pt-2">
              <h3 className="font-black text-sm uppercase tracking-widest text-[#171717] mb-3">Transaksi Hari Ini</h3>
              {todayTransactions.length === 0 ? (
                <div className="text-center py-6 bg-[#F9F9F9] border-2 border-dashed border-[#CCCCCC]">
                  <p className="text-sm font-bold text-[#999999]">Belum ada transaksi hari ini.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayTransactions.map(t => (
                    <div key={t.id} className="flex justify-between items-center p-3 border-2 border-[#171717] bg-[#FFF9E9]">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{t.title}</span>
                        <span className="text-xs font-black uppercase text-[#777777]">{t.category_name}</span>
                      </div>
                      <span className={`font-black ${t.type === 'income' ? 'text-[#35A66F]' : 'text-[#EF4444]'}`}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Tabel Bulanan & Mingguan */}
        <div className="space-y-6">
          <div className="comic-panel p-6 bg-white space-y-6">
            <div className="flex items-center gap-3 border-b-4 border-[#171717] pb-4">
              <TrendingUp className="w-8 h-8 text-[#171717]" strokeWidth={3} />
              <h2 className="text-2xl font-comic uppercase tracking-wide text-[#171717] mt-1">Planner Bulanan</h2>
            </div>

            {/* Target Uang Bulanan */}
            <div className="bg-[#FFD83D] border-4 border-[#171717] p-5 shadow-[4px_4px_0px_0px_#171717]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black uppercase text-sm tracking-widest">Uang / Target Bulanan</h3>
                <button 
                  onClick={() => setIsEditingBudget(!isEditingBudget)}
                  className="p-1 hover:bg-white border-2 border-transparent hover:border-[#171717] transition-all"
                >
                  <Edit3 className="w-4 h-4 text-[#171717]" strokeWidth={3} />
                </button>
              </div>
              
              {isEditingBudget ? (
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={tempBudget} 
                    onChange={(e) => setTempBudget(e.target.value)}
                    className="w-full comic-input px-3 py-2"
                  />
                  <button onClick={handleSaveBudget} className="comic-button comic-button-primary px-4">
                    <Save className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="text-3xl font-comic tracking-wider">{formatCurrency(monthlyBudget)}</div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border-2 border-[#171717] p-4 text-center flex flex-col justify-center">
                <p className="text-xs font-black uppercase text-[#777777] mb-1">Sisa Target Bulan Ini</p>
                <p className={`text-xl font-bold ${remainingMonthlyBudget < 0 ? 'text-[#EF4444]' : 'text-[#35A66F]'}`}>
                  {formatCurrency(remainingMonthlyBudget)}
                </p>
              </div>
              <div className="bg-white border-2 border-[#171717] p-4 text-center flex flex-col justify-center">
                <p className="text-xs font-black uppercase text-[#777777] mb-1">Target Mingguan</p>
                <p className="text-xl font-bold text-[#3478F6]">
                  {formatCurrency(weeklyTarget)}
                </p>
                <p className="text-[10px] font-bold text-[#999999] mt-1">Asumsi 4 Minggu</p>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-dashed border-[#CCCCCC]">
              <h3 className="font-black text-sm uppercase tracking-widest text-[#171717] mb-3">Statistik Progres</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase mb-1">
                    <span>Penggunaan Bulanan</span>
                    <span>{monthlyBudget > 0 ? Math.round((currentMonthExpense / monthlyBudget) * 100) : 0}%</span>
                  </div>
                  <div className="h-4 bg-[#F0F0F0] border-2 border-[#171717] w-full relative overflow-hidden">
                    <div 
                      className={`absolute top-0 bottom-0 left-0 border-r-2 border-[#171717] ${currentMonthExpense > monthlyBudget ? 'bg-[#EF4444]' : 'bg-[#FFD83D]'}`}
                      style={{ width: `${Math.min((monthlyBudget > 0 ? (currentMonthExpense / monthlyBudget) * 100 : 0), 100)}%` }}
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-[#E9F2FF] border-2 border-[#171717]">
                  <p className="text-sm font-bold text-[#171717]">
                    Berdasarkan sisa hari ({remainingDays} hari), agar uangmu cukup sampai akhir bulan, usahakan pengeluaran maksimal <strong className="font-black text-[#3478F6]">{formatCurrency(dynamicDailySafeLimit)}</strong> per hari.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
