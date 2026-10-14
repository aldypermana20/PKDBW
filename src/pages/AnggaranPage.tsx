import React, { useState } from 'react';
import { PieChart, Plus, AlertTriangle, CheckCircle, Tag, X } from 'lucide-react';
import { useFinancial } from '../context/FinancialContext';
import { IconResolver } from '../components/common/IconResolver';

export const AnggaranPage: React.FC = () => {
  const { budgets, categories, addBudget, formatCurrency } = useFinancial();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [limitAmount, setLimitAmount] = useState('');

  const expenseCategories = categories.filter((c) => c.type === 'expense');

  const handleAddBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId || !limitAmount) return;

    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;

    const today = new Date();
    await addBudget({
      category_id: categoryId,
      category_name: cat.name,
      category_icon: cat.icon,
      limit_amount: parseFloat(limitAmount),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    });

    setCategoryId('');
    setLimitAmount('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-comic tracking-wide text-[#171717] uppercase drop-shadow-[1px_1px_0px_#FFFFFF]">Misi Anggaran</h1>
          <p className="text-sm font-bold text-[#777777]">Atur batas pengeluaran bulanan agar keuangan tetap terkontrol.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="comic-button comic-button-primary flex items-center gap-2 px-5 py-3"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
          <span>Buat Misi Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((b) => {
          const percentage = Math.min(100, Math.round((b.current_spent / b.limit_amount) * 100));
          const isDanger = percentage >= 90;
          const isWarning = percentage >= 75 && percentage < 90;

          return (
            <div key={b.id} className="comic-panel p-6 bg-white relative hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border-3 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center text-[#171717] transform -rotate-3">
                    <IconResolver name={b.category_icon || 'Tag'} className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#171717] uppercase">{b.category_name}</h3>
                    <p className="text-[11px] font-bold text-[#777777] uppercase tracking-widest">Target Bulan Ini</p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] ${
                      isDanger
                        ? 'bg-[#EF4444] text-white'
                        : isWarning
                        ? 'bg-[#FFD83D] text-[#171717]'
                        : 'bg-[#35A66F] text-white'
                    }`}
                  >
                    {isDanger ? (
                      <>
                        <AlertTriangle className="w-4 h-4" strokeWidth={3} /> Awas ({percentage}%)
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" strokeWidth={3} /> Aman ({percentage}%)
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="w-full h-5 bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] p-0.5 relative">
                  <div
                    className={`h-full border-r-2 border-[#171717] ${
                      isDanger
                        ? 'bg-[#EF4444]'
                        : isWarning
                        ? 'bg-[#FFD83D]'
                        : 'bg-[#35A66F]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider pt-2 border-t-2 border-[#171717] border-dashed">
                  <span className="text-[#171717]">
                    Terpakai: <span className="font-numbers ml-1 text-sm">{formatCurrency(b.current_spent)}</span>
                  </span>
                  <span className="text-[#777777]">
                    Batas: <span className="text-[#171717] font-numbers ml-1 text-sm">{formatCurrency(b.limit_amount)}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add Budget */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/80">
          <div className="w-full max-w-md bg-white border-4 border-[#171717] shadow-[8px_8px_0px_0px_#171717] p-6 space-y-6 relative overflow-y-auto max-h-[95vh] sm:max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="halftone-bg absolute inset-0 pointer-events-none"></div>
            
            <div className="flex items-center justify-between border-b-4 border-[#171717] pb-4 relative z-10">
              <h2 className="text-2xl font-comic tracking-wide text-[#171717] uppercase">Buat Misi Anggaran</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#171717] hover:text-[#EF4444] transition-colors">
                <X className="w-8 h-8" strokeWidth={3} />
              </button>
            </div>

            <form onSubmit={handleAddBudget} className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-black uppercase text-[#171717] mb-2">Pilih Kategori Misi</label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-3 comic-input text-base font-bold appearance-none uppercase"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {expenseCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-black uppercase text-[#171717] mb-2">Batas Pengeluaran Maksimal</label>
                <input
                  type="number"
                  required
                  min="1000"
                  placeholder="Contoh: 1000000"
                  value={limitAmount}
                  onChange={(e) => setLimitAmount(e.target.value)}
                  className="w-full px-4 py-3 comic-input text-lg font-numbers font-bold"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t-4 border-[#171717]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="comic-button px-6 py-3 uppercase tracking-wider"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="comic-button comic-button-primary px-6 py-3 uppercase tracking-wider"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
