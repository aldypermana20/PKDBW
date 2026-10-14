import React, { useState } from 'react';
import { FolderKanban, Plus, Tag, ArrowDownRight, ArrowUpRight, X } from 'lucide-react';
import { useFinancial } from '../context/FinancialContext';
import { IconResolver } from '../components/common/IconResolver';
import { TransactionType } from '../types';

export const KategoriPage: React.FC = () => {
  const { categories, addCategory } = useFinancial();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [icon, setIcon] = useState('Tag');
  const [color, setColor] = useState('#3478F6');

  const incomeCategories = categories.filter((c) => c.type === 'income');
  const expenseCategories = categories.filter((c) => c.type === 'expense');

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    await addCategory({
      name,
      type,
      icon,
      color,
    });

    setName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-comic tracking-wide text-[#171717] uppercase drop-shadow-[1px_1px_0px_#FFFFFF]">Katalog Kategori</h1>
          <p className="text-sm font-bold text-[#777777]">Kelompokkan setiap transaksi ke label yang jelas.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="comic-button comic-button-primary flex items-center gap-2 px-5 py-3"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
          <span>Tambah Kategori</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Categories */}
        <div className="comic-panel p-6 bg-white space-y-4">
          <div className="flex items-center gap-3 text-[#35A66F] font-comic text-2xl uppercase tracking-wide border-b-4 border-[#171717] pb-4">
            <ArrowUpRight className="w-8 h-8" strokeWidth={3} />
            <span className="mt-1">Pemasukan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {incomeCategories.map((c) => (
              <div
                key={c.id}
                className="p-3 bg-[#FFF9E9] border-3 border-[#171717] shadow-[4px_4px_0px_0px_#171717] flex items-center gap-4 hover:-translate-y-1 transition-transform"
              >
                <div
                  className="w-12 h-12 border-2 border-[#171717] flex items-center justify-center text-white bg-white shadow-[2px_2px_0px_0px_#171717]"
                >
                  <IconResolver name={c.icon} className="w-6 h-6 text-[#171717]" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-black text-[#171717] uppercase tracking-wide">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Categories */}
        <div className="comic-panel p-6 bg-white space-y-4">
          <div className="flex items-center gap-3 text-[#EF4444] font-comic text-2xl uppercase tracking-wide border-b-4 border-[#171717] pb-4">
            <ArrowDownRight className="w-8 h-8" strokeWidth={3} />
            <span className="mt-1">Pengeluaran</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {expenseCategories.map((c) => (
              <div
                key={c.id}
                className="p-3 bg-[#FFF9E9] border-3 border-[#171717] shadow-[4px_4px_0px_0px_#171717] flex items-center gap-4 hover:-translate-y-1 transition-transform"
              >
                <div
                  className="w-12 h-12 border-2 border-[#171717] flex items-center justify-center text-white bg-white shadow-[2px_2px_0px_0px_#171717]"
                >
                  <IconResolver name={c.icon} className="w-6 h-6 text-[#171717]" strokeWidth={2.5} />
                </div>
                <span className="text-sm font-black text-[#171717] uppercase tracking-wide">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Add Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/80">
          <div className="w-full max-w-md bg-white border-4 border-[#171717] shadow-[8px_8px_0px_0px_#171717] p-6 space-y-6 relative overflow-y-auto max-h-[95vh] sm:max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="halftone-bg absolute inset-0 pointer-events-none"></div>

            <div className="flex items-center justify-between border-b-4 border-[#171717] pb-4 relative z-10">
              <h2 className="text-2xl font-comic tracking-wide text-[#171717] uppercase">Kategori Baru</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#171717] hover:text-[#EF4444] transition-colors">
                <X className="w-8 h-8" strokeWidth={3} />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-black uppercase text-[#171717] mb-2">Nama Kategori</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Belanja Bulanan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 comic-input text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase text-[#171717] mb-2">Jenis Arus Kas</label>
                <select
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full px-4 py-3 comic-input text-base font-bold appearance-none uppercase"
                >
                  <option value="expense">Pengeluaran</option>
                  <option value="income">Pemasukan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-black uppercase text-[#171717] mb-2">entitas</label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-4 py-3 comic-input text-base font-bold appearance-none uppercase"
                >
                  <option value="Tag">Label Umum</option>
                  <option value="ShoppingBag">Belanja</option>
                  <option value="Utensils">Makanan</option>
                  <option value="Coffee">Minuman</option>
                  <option value="Car">Transportasi</option>
                  <option value="Zap">Tagihan & Utilitas</option>
                  <option value="Gamepad2">Hiburan</option>
                  <option value="Briefcase">Gaji / Pekerjaan</option>
                  <option value="TrendingUp">Investasi / Profit</option>
                </select>
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
