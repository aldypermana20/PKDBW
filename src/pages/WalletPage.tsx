import React, { useState } from 'react';
import { Wallet as WalletIcon, Plus, CreditCard, Banknote, Smartphone, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useFinancial } from '../context/FinancialContext';
import { WalletType, TransactionType, Wallet } from '../types';
import { AdjustBalanceModal } from '../components/modals/AdjustBalanceModal';

export const WalletPage: React.FC = () => {
  const { wallets, addWallet, updateWallet, deleteWallet, formatCurrency } = useFinancial();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<WalletType>('bank');
  const [balance, setBalance] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [color, setColor] = useState('#3478F6');
  
  // Adjust Balance state
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustWallet, setAdjustWallet] = useState<Wallet | null>(null);
  const [adjustType, setAdjustType] = useState<TransactionType>('income');

  const handleAddWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !balance) return;

    await addWallet({
      name,
      type,
      balance: parseFloat(balance),
      account_number: accountNumber,
      color,
    });

    resetForm();
    setIsModalOpen(false);
  };

  const resetForm = () => {
    setName('');
    setBalance('');
    setAccountNumber('');
    setColor('#3478F6');
    setType('bank');
  };

  const handleAdjustClick = (w: Wallet, type: TransactionType) => {
    setAdjustWallet(w);
    setAdjustType(type);
    setIsAdjustModalOpen(true);
  };

  const getWalletIcon = (t: WalletType) => {
    switch (t) {
      case 'bank':
        return CreditCard;
      case 'ewallet':
        return Smartphone;
      default:
        return Banknote;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-comic tracking-wide text-[#171717] uppercase drop-shadow-[1px_1px_0px_#FFFFFF]">Dompet & Brankas</h1>
          <p className="text-sm font-bold text-[#777777]">Kelola sumber dana, bank, e-wallet, dan uang tunai Anda.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="comic-button comic-button-primary flex items-center gap-2 px-5 py-3"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
          <span>Tambah Dompet Baru</span>
        </button>
      </div>

      {/* Grid Dompet */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.map((w) => {
          const IconComp = getWalletIcon(w.type);

          return (
            <div
              key={w.id}
              className="comic-panel p-6 bg-white relative overflow-hidden group transition-transform hover:-translate-y-1"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"
                style={{ backgroundColor: w.color || '#3b82f6' }}
              />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <div
                  className="w-14 h-14 border-3 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center text-white transform -rotate-3 group-hover:rotate-0 transition-transform"
                  style={{ backgroundColor: w.color || '#3b82f6' }}
                >
                  <IconComp className="w-7 h-7" strokeWidth={2.5} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAdjustClick(w, 'income')}
                    className="flex items-center gap-1 p-2 bg-white border-2 border-[#171717] text-[#35A66F] font-black uppercase text-xs hover:bg-[#35A66F] hover:text-white transition-all shadow-[2px_2px_0px_0px_#171717]"
                    title="Tambah Dana"
                  >
                    <ArrowUpRight className="w-4 h-4" strokeWidth={3} /> Tambah
                  </button>
                  <button
                    onClick={() => handleAdjustClick(w, 'expense')}
                    className="flex items-center gap-1 p-2 bg-white border-2 border-[#171717] text-[#EF4444] font-black uppercase text-xs hover:bg-[#EF4444] hover:text-white transition-all shadow-[2px_2px_0px_0px_#171717]"
                    title="Kurangi Dana"
                  >
                    <ArrowDownRight className="w-4 h-4" strokeWidth={3} /> Kurangi
                  </button>
                </div>
              </div>

              <div className="space-y-1 relative z-10">
                <h3 className="text-xl font-black text-[#171717] uppercase tracking-wide">{w.name}</h3>
                <p className="text-xs text-[#777777] uppercase font-bold tracking-widest">{w.type}</p>
                {w.account_number && (
                  <p className="text-xs font-black text-[#171717] bg-[#FFF9E9] border-2 border-[#171717] inline-block px-2 py-0.5 mt-2">
                    NO: {w.account_number}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t-4 border-[#171717] flex items-center justify-between relative z-10 bg-[#FFD83D] -mx-6 -mb-6 px-6 py-4">
                <span className="text-xs font-black uppercase tracking-wider text-[#171717]">Saldo Aktif</span>
                <span className="text-2xl font-numbers font-black text-[#171717] drop-shadow-[1px_1px_0px_#FFFFFF]">{formatCurrency(w.balance)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Tambah Wallet */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/80">
          <div className="w-full max-w-md bg-white border-4 border-[#171717] shadow-[8px_8px_0px_0px_#171717] p-6 space-y-6 relative overflow-y-auto max-h-[95vh] sm:max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="halftone-bg absolute inset-0 pointer-events-none"></div>
            
            <div className="flex items-center justify-between border-b-4 border-[#171717] pb-4 relative z-10">
              <h2 className="text-2xl font-comic tracking-wide text-[#171717] uppercase">
                Tambah Dompet Baru
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#171717] hover:text-[#EF4444] transition-colors">
                <X className="w-8 h-8" strokeWidth={3} />
              </button>
            </div>

            <form onSubmit={handleAddWallet} className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-black uppercase text-[#171717] mb-2">Nama Dompet/Bank</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bank Mandiri, OVO, Cash..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 comic-input text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase text-[#171717] mb-2">Tipe Wallet</label>
                <select
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full px-4 py-3 comic-input text-base font-bold appearance-none uppercase"
                >
                  <option value="bank">Bank Account</option>
                  <option value="ewallet">E-Wallet</option>
                  <option value="cash">Uang Tunai</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-black uppercase text-[#171717] mb-2">Saldo Awal</label>
                <input
                  type="number"
                  required
                  min="0"
                  placeholder="0"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full px-4 py-3 comic-input text-lg font-numbers font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase text-[#171717] mb-2">No. Rekening / HP</label>
                <input
                  type="text"
                  placeholder="Opsional (misal: 12345678)"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-4 py-3 comic-input text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase text-[#171717] mb-2">Warna Tema</label>
                <div className="flex gap-3">
                  {['#3478F6', '#EF4444', '#35A66F', '#FFD83D', '#9333EA', '#F97316', '#171717'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-none border-2 border-[#171717] ${
                        color === c ? 'shadow-[2px_2px_0px_0px_#171717] transform -translate-y-1' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
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
      <AdjustBalanceModal
        isOpen={isAdjustModalOpen}
        onClose={() => {
          setIsAdjustModalOpen(false);
          setAdjustWallet(null);
        }}
        wallet={adjustWallet}
        defaultType={adjustType}
      />
    </div>
  );
};
