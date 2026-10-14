import React, { useState } from 'react';
import { X, ArrowDownRight, ArrowUpRight, Calendar, DollarSign, Tag, Wallet as WalletIcon, FileText } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import { TransactionType } from '../../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { categories, wallets, addTransaction, formatCurrency } = useFinancial();

  const [type, setType] = useState<TransactionType>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [walletId, setWalletId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const filteredCategories = categories.filter((c) => c.type === type);
  const selectedCategory = categories.find((c) => c.id === categoryId);
  const selectedWallet = wallets.find((w) => w.id === walletId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !categoryId || !walletId) return;

    setIsSubmitting(true);
    try {
      await addTransaction({
        title,
        amount: parseFloat(amount),
        type,
        category_id: categoryId,
        category_name: selectedCategory?.name || 'Lainnya',
        category_icon: selectedCategory?.icon || 'Tag',
        category_color: selectedCategory?.color || '#6366f1',
        wallet_id: walletId,
        wallet_name: selectedWallet?.name || 'Utama',
        date,
        notes,
      });

      // Reset form
      setTitle('');
      setAmount('');
      setCategoryId('');
      setWalletId('');
      setNotes('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/80 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white border-4 border-[#171717] shadow-[8px_8px_0px_0px_#171717] relative overflow-y-auto max-h-[95vh] sm:max-h-[90vh]">
        <div className="halftone-bg absolute inset-0 pointer-events-none mix-blend-multiply opacity-30"></div>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-4 border-[#171717] bg-[#FFD83D] relative z-10">
          <h2 className="text-2xl font-comic tracking-wide text-[#171717] uppercase drop-shadow-[1px_1px_0px_#FFFFFF]">
            Catat Transaksi
          </h2>
          <button
            onClick={onClose}
            className="text-[#171717] hover:text-[#EF4444] transition-colors"
          >
            <X className="w-8 h-8" strokeWidth={3} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 relative z-10 bg-white">
          {/* Type Switcher */}
          <div className="flex gap-4 border-b-4 border-[#171717] pb-4">
            <button
              type="button"
              onClick={() => {
                setType('expense');
                setCategoryId('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 border-3 text-sm font-black uppercase transition-all ${
                type === 'expense'
                  ? 'bg-[#EF4444] text-white border-[#171717] shadow-[4px_4px_0px_0px_#171717] -translate-y-1'
                  : 'bg-white text-[#777777] border-[#171717] hover:bg-[#FFF9E9]'
              }`}
            >
              <ArrowDownRight className="w-5 h-5" strokeWidth={3} />
              <span>Pengeluaran</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setType('income');
                setCategoryId('');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 border-3 text-sm font-black uppercase transition-all ${
                type === 'income'
                  ? 'bg-[#35A66F] text-white border-[#171717] shadow-[4px_4px_0px_0px_#171717] -translate-y-1'
                  : 'bg-white text-[#777777] border-[#171717] hover:bg-[#FFF9E9]'
              }`}
            >
              <ArrowUpRight className="w-5 h-5" strokeWidth={3} />
              <span>Pemasukan</span>
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-black uppercase text-[#171717] mb-2">Jumlah Nominal</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171717] font-black text-xl">
                Rp
              </span>
              <input
                type="number"
                required
                min="1"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-4 comic-input text-2xl font-numbers font-black"
              />
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-black uppercase text-[#171717] mb-2">Nama Transaksi</label>
            <input
              type="text"
              required
              placeholder="Contoh: Belanja Bulanan, Beli Makan..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 comic-input text-base"
            />
          </div>

          {/* Category & Wallet Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-black uppercase text-[#171717] mb-2">Kategori</label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 comic-input text-base font-bold appearance-none uppercase"
              >
                <option value="">-- Pilih --</option>
                {filteredCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-black uppercase text-[#171717] mb-2">Dompet</label>
              <select
                required
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                className="w-full px-4 py-3 comic-input text-base font-bold appearance-none uppercase"
              >
                <option value="">-- Pilih --</option>
                {wallets.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({formatCurrency(w.balance)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-black uppercase text-[#171717] mb-2">Tanggal</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 comic-input text-base font-bold uppercase"
            />
          </div>

          {/* Notes Input */}
          <div>
            <label className="block text-sm font-black uppercase text-[#171717] mb-2">Catatan (Opsional)</label>
            <textarea
              rows={2}
              placeholder="Tambah rincian atau keterangan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 comic-input text-base resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 mt-4 border-t-4 border-[#171717] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="comic-button px-6 py-3 uppercase tracking-wider text-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="comic-button comic-button-primary px-8 py-3 uppercase tracking-wider text-sm"
            >
              {isSubmitting ? 'MENYIMPAN...' : 'SIMPAN TRANSAKSI'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
