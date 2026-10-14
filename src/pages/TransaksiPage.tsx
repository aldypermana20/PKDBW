import React, { useState } from 'react';
import { Search, Filter, Trash2, Edit, ArrowUpRight, ArrowDownRight, Calendar, Tag, Wallet, Plus, AlertOctagon } from 'lucide-react';
import { useFinancial } from '../context/FinancialContext';
import { IconResolver } from '../components/common/IconResolver';
import { EditTransactionModal } from '../components/modals/EditTransactionModal';
import { Transaction } from '../types';

export const TransaksiPage: React.FC = () => {
  const { transactions, categories, wallets, deleteTransaction, formatCurrency } = useFinancial();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWallet, setSelectedWallet] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

  const openEditModal = (tx: Transaction) => {
    setTransactionToEdit(tx);
    setIsEditModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setTransactionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (transactionToDelete) {
      await deleteTransaction(transactionToDelete);
      setIsDeleteModalOpen(false);
      setTransactionToDelete(null);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (tx.notes && tx.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || tx.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || tx.category_id === selectedCategory;
    const matchesWallet = selectedWallet === 'all' || tx.wallet_id === selectedWallet;
    
    const matchesStartDate = !startDate || tx.date >= startDate;
    const matchesEndDate = !endDate || tx.date <= endDate;

    return matchesSearch && matchesType && matchesCategory && matchesWallet && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-comic tracking-wide text-[#171717] uppercase">Logbook Transaksi</h1>
          <p className="text-sm font-bold text-[#777777]">Pantau jejak masuk dan keluarnya uang Anda.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="comic-panel p-5 bg-[#FFF9E9] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#171717] absolute left-3 top-1/2 -translate-y-1/2" strokeWidth={3} />
          <input
            type="text"
            placeholder="Cari transaksi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 comic-input text-sm"
          />
        </div>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e: any) => setSelectedType(e.target.value)}
          className="w-full px-4 py-3 comic-input text-sm uppercase tracking-wide appearance-none"
        >
          <option value="all">Semua Arus</option>
          <option value="income">Pemasukan Saja</option>
          <option value="expense">Pengeluaran Saja</option>
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-3 comic-input text-sm uppercase tracking-wide appearance-none"
        >
          <option value="all">Semua Kategori</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Wallet Filter */}
        <select
          value={selectedWallet}
          onChange={(e) => setSelectedWallet(e.target.value)}
          className="w-full px-4 py-3 comic-input text-sm uppercase tracking-wide appearance-none"
        >
          <option value="all">Semua Dompet</option>
          {wallets.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
        
        {/* Start Date Filter */}
        <div className="relative">
          <label className="absolute -top-3 left-2 bg-[#FFF9E9] px-1 text-[10px] font-black uppercase text-[#171717] z-10">Dari Tanggal</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 comic-input text-sm font-bold uppercase"
          />
        </div>

        {/* End Date Filter */}
        <div className="relative">
          <label className="absolute -top-3 left-2 bg-[#FFF9E9] px-1 text-[10px] font-black uppercase text-[#171717] z-10">Sampai Tanggal</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 comic-input text-sm font-bold uppercase"
          />
        </div>
      </div>

      {/* Transaction Table / List */}
      <div className="comic-panel overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFD83D] text-xs font-black uppercase tracking-widest text-[#171717] border-b-4 border-[#171717]">
                <th className="px-6 py-4 border-r-4 border-[#171717]">Transaksi</th>
                <th className="px-6 py-4 border-r-4 border-[#171717]">Kategori</th>
                <th className="px-6 py-4 border-r-4 border-[#171717]">Dompet</th>
                <th className="px-6 py-4 border-r-4 border-[#171717]">Tanggal</th>
                <th className="px-6 py-4 border-r-4 border-[#171717] text-right">Nominal</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-[#171717]">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center font-bold text-[#777777] uppercase bg-[#FFF9E9]">
                    Tidak ada transaksi yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx, idx) => (
                  <tr
                    key={tx.id}
                    className={`hover:bg-[#FFF9E9] transition-colors ${
                      idx !== filteredTransactions.length - 1 ? 'border-b-2 border-[#171717]' : ''
                    }`}
                  >
                    <td className="px-6 py-4 border-r-2 border-[#171717]">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center ${
                            tx.type === 'income' ? 'bg-[#35A66F]' : 'bg-[#EF4444]'
                          }`}
                        >
                          <IconResolver name={tx.category_icon || 'Tag'} className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                          <div className="font-black text-[#171717] text-base uppercase">{tx.title}</div>
                          {tx.notes && <div className="text-[11px] text-[#777777] uppercase">{tx.notes}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-r-2 border-[#171717]">
                      <span className="px-3 py-1 bg-white border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] text-xs font-black uppercase">
                        {tx.category_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-r-2 border-[#171717] uppercase tracking-wide">
                      {tx.wallet_name}
                    </td>
                    <td className="px-6 py-4 border-r-2 border-[#171717] uppercase">
                      {tx.date}
                    </td>
                    <td className="px-6 py-4 border-r-2 border-[#171717] text-right">
                      <span
                        className={`font-numbers font-black text-lg ${
                          tx.type === 'income' ? 'text-[#35A66F]' : 'text-[#EF4444]'
                        }`}
                      >
                        {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(tx)}
                          className="p-2 text-[#171717] border-2 border-transparent hover:border-[#171717] hover:bg-[#FFD83D] transition-all shadow-none hover:shadow-[2px_2px_0px_0px_#171717]"
                          title="Edit Transaksi"
                        >
                          <Edit className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() => confirmDelete(tx.id)}
                          className="p-2 text-[#171717] border-2 border-transparent hover:border-[#171717] hover:bg-[#EF4444] hover:text-white transition-all shadow-none hover:shadow-[2px_2px_0px_0px_#171717]"
                          title="Hapus Transaksi"
                        >
                          <Trash2 className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setTransactionToEdit(null);
        }}
        transaction={transactionToEdit}
      />

      {/* Comic Style Custom Delete Confirm Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/80 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white border-4 border-[#171717] shadow-[12px_12px_0px_0px_#171717] relative transform -rotate-1">
            <div className="halftone-bg absolute inset-0 pointer-events-none opacity-20"></div>
            
            <div className="relative z-10 p-6 flex flex-col items-center text-center space-y-4 pt-10">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#EF4444] border-4 border-[#171717] rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#171717] animate-bounce">
                <AlertOctagon className="w-10 h-10 text-white" strokeWidth={3} />
              </div>
              
              <h2 className="text-4xl font-comic text-[#171717] uppercase tracking-wider drop-shadow-[1px_1px_0px_#FFFFFF] transform rotate-2 mt-4">
                YAKIN HAPUS?
              </h2>
              
              <div className="speech-bubble p-4 text-sm font-bold text-[#171717] leading-relaxed text-center w-full mt-2">
                Transaksi ini akan hilang selamanya dan saldo dompet akan dikembalikan.
              </div>

              <div className="flex gap-4 w-full mt-6 pt-4">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setTransactionToDelete(null);
                  }}
                  className="flex-1 comic-button px-4 py-3 bg-[#FFF9E9] text-sm hover:bg-white"
                >
                  BATAL
                </button>
                <button
                  onClick={executeDelete}
                  className="flex-1 comic-button px-4 py-3 bg-[#EF4444] text-white text-sm"
                >
                  HAPUS!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
