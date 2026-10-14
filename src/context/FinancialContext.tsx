import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Transaction, Wallet, Category, Budget, FinancialSummary, UserProfile } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface FinancialContextType {
  transactions: Transaction[];
  wallets: Wallet[];
  categories: Category[];
  budgets: Budget[];
  user: UserProfile | null;
  summary: FinancialSummary;
  isLoading: boolean;
  addTransaction: (tx: Omit<Transaction, 'id' | 'created_at'>) => Promise<void>;
  updateTransaction: (id: string, updatedData: Partial<Omit<Transaction, 'id' | 'created_at'>>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addWallet: (wallet: Omit<Wallet, 'id' | 'created_at'>) => Promise<void>;
  updateWallet: (id: string, wallet: Partial<Wallet>) => Promise<void>;
  deleteWallet: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  addBudget: (budget: Omit<Budget, 'id' | 'current_spent'>) => Promise<void>;
  formatCurrency: (amount: number) => string;
  monthlyBudget: number;
  setMonthlyBudget: (amount: number) => void;
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined);

export const FinancialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [monthlyBudget, setMonthlyBudgetState] = useState<number>(() => {
    const saved = localStorage.getItem('monthlyBudget');
    return saved ? parseInt(saved, 10) : 0;
  });

  const setMonthlyBudget = (amount: number) => {
    setMonthlyBudgetState(amount);
    localStorage.setItem('monthlyBudget', amount.toString());
  };

  const { user: authUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // FETCH DATA FROM SUPABASE
  const fetchData = useCallback(async () => {
    if (!authUser) {
      setTransactions([]);
      setWallets([]);
      setCategories([]);
      setBudgets([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const [txRes, walletRes, catRes, budgetRes] = await Promise.all([
          supabase.from('transactions').select('*').eq('user_id', authUser.id).order('created_at', { ascending: false }),
          supabase.from('wallets').select('*').eq('user_id', authUser.id).order('created_at', { ascending: true }),
          supabase.from('categories').select('*').eq('user_id', authUser.id),
          supabase.from('budgets').select('*').eq('user_id', authUser.id)
        ]);

        console.log('Fetched transactions:', txRes.data);
        console.log('Fetched wallets:', walletRes.data);
        console.log('Fetched categories:', catRes.data);

        if (txRes.data) setTransactions(txRes.data);
        if (walletRes.data) setWallets(walletRes.data);
        if (catRes.data) setCategories(catRes.data);
        if (budgetRes.data) setBudgets(budgetRes.data);
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    } finally {
      setIsLoading(false);
    }
  }, [authUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData, authUser]);

  // Calculate Summary
  const calculateSummary = (): FinancialSummary => {
    const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      totalBalance,
      totalIncome,
      totalExpense,
      netSavings: totalIncome - totalExpense,
      monthlyIncomeChangePercentage: 12.5,
      monthlyExpenseChangePercentage: -4.2,
    };
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const addTransaction = async (txData: Omit<Transaction, 'id' | 'created_at'>) => {
    // 1. Simpan ke Supabase
    const payload = { ...txData, user_id: authUser?.id };
    const { data, error } = await supabase.from('transactions').insert([payload]).select();
    if (error || !data) {
      console.error(error);
      return;
    }
    
    const newTx = data[0];

    // 2. Update state lokal agar UI cepat (Optimistic Update)
    setTransactions((prev) => [newTx, ...prev]);

    // 3. Update saldo dompet
    const targetWallet = wallets.find(w => w.id === txData.wallet_id);
    if (targetWallet) {
      const newBalance = txData.type === 'income' ? targetWallet.balance + txData.amount : targetWallet.balance - txData.amount;
      const safeBalance = Math.max(0, newBalance);
      await supabase.from('wallets').update({ balance: safeBalance }).eq('id', targetWallet.id);
      setWallets((prev) => prev.map((w) => (w.id === targetWallet.id ? { ...w, balance: safeBalance } : w)));
    }

    // 4. Update budget jika pengeluaran
    if (txData.type === 'expense') {
      const targetBudget = budgets.find(b => b.category_id === txData.category_id);
      if (targetBudget) {
        const newSpent = targetBudget.current_spent + txData.amount;
        await supabase.from('budgets').update({ current_spent: newSpent }).eq('id', targetBudget.id);
        setBudgets((prev) => prev.map((b) => (b.category_id === txData.category_id ? { ...b, current_spent: newSpent } : b)));
      }
    }
  };

  const deleteTransaction = async (id: string) => {
    const txToDelete = transactions.find((t) => t.id === id);
    if (!txToDelete) return;

    // 1. Hapus di Supabase
    await supabase.from('transactions').delete().eq('id', id);
    
    // 2. Update state lokal
    setTransactions((prev) => prev.filter((t) => t.id !== id));

    // 3. Kembalikan saldo dompet
    const targetWallet = wallets.find(w => w.id === txToDelete.wallet_id);
    if (targetWallet) {
      const newBalance = txToDelete.type === 'income' ? targetWallet.balance - txToDelete.amount : targetWallet.balance + txToDelete.amount;
      const safeBalance = Math.max(0, newBalance);
      await supabase.from('wallets').update({ balance: safeBalance }).eq('id', targetWallet.id);
      setWallets((prev) => prev.map((w) => (w.id === targetWallet.id ? { ...w, balance: safeBalance } : w)));
    }

    // 4. Kembalikan budget jika pengeluaran
    if (txToDelete.type === 'expense') {
      const targetBudget = budgets.find(b => b.category_id === txToDelete.category_id);
      if (targetBudget) {
        const newSpent = Math.max(0, targetBudget.current_spent - txToDelete.amount);
        await supabase.from('budgets').update({ current_spent: newSpent }).eq('id', targetBudget.id);
        setBudgets((prev) => prev.map((b) => (b.category_id === txToDelete.category_id ? { ...b, current_spent: newSpent } : b)));
      }
    }
  };

  const updateTransaction = async (id: string, updatedData: Partial<Omit<Transaction, 'id' | 'created_at'>>) => {
    const oldTx = transactions.find((t) => t.id === id);
    if (!oldTx) return;

    // 1. Update di Supabase
    const { data, error } = await supabase.from('transactions').update(updatedData).eq('id', id).select();
    if (error || !data) return;

    const newTx = data[0];
    setTransactions((prev) => prev.map((t) => (t.id === id ? newTx : t)));

    // 2. Hitung & Update Dompet di Supabase + Lokal
    let wBalances: Record<string, number> = {};
    wBalances[oldTx.wallet_id] = oldTx.type === 'income' ? -oldTx.amount : oldTx.amount;
    wBalances[newTx.wallet_id] = (wBalances[newTx.wallet_id] || 0) + (newTx.type === 'income' ? newTx.amount : -newTx.amount);

    for (const wId of Object.keys(wBalances)) {
      if (wBalances[wId] !== 0) {
        const wallet = wallets.find(w => w.id === wId);
        if (wallet) {
          const newBal = Math.max(0, wallet.balance + wBalances[wId]);
          await supabase.from('wallets').update({ balance: newBal }).eq('id', wId);
          setWallets(prev => prev.map(w => w.id === wId ? { ...w, balance: newBal } : w));
        }
      }
    }

    // 3. Update Budget di Supabase + Lokal
    let bChanges: Record<string, number> = {};
    if (oldTx.type === 'expense' && oldTx.category_id) {
       bChanges[oldTx.category_id] = -oldTx.amount;
    }
    if (newTx.type === 'expense' && newTx.category_id) {
       bChanges[newTx.category_id] = (bChanges[newTx.category_id] || 0) + newTx.amount;
    }

    for (const catId of Object.keys(bChanges)) {
      if (bChanges[catId] !== 0) {
        const budget = budgets.find(b => b.category_id === catId);
        if (budget) {
          const newSpent = Math.max(0, budget.current_spent + bChanges[catId]);
          await supabase.from('budgets').update({ current_spent: newSpent }).eq('id', budget.id);
          setBudgets(prev => prev.map(b => b.id === budget.id ? { ...b, current_spent: newSpent } : b));
        }
      }
    }
  };

  const addWallet = async (walletData: Omit<Wallet, 'id' | 'created_at'>) => {
    const payload = { ...walletData, user_id: authUser?.id };
    const { data, error } = await supabase.from('wallets').insert([payload]).select();
    if (!error && data) {
      setWallets((prev) => [...prev, data[0]]);
    }
  };

  const updateWallet = async (id: string, walletData: Partial<Wallet>) => {
    const { data, error } = await supabase.from('wallets').update(walletData).eq('id', id).select();
    if (!error && data) {
      setWallets((prev) => prev.map((w) => (w.id === id ? data[0] : w)));
    }
  };

  const deleteWallet = async (id: string) => {
    await supabase.from('wallets').delete().eq('id', id);
    setWallets((prev) => prev.filter((w) => w.id !== id));
  };

  const addCategory = async (categoryData: Omit<Category, 'id'>) => {
    const payload = { ...categoryData, user_id: authUser?.id };
    const { data, error } = await supabase.from('categories').insert([payload]).select();
    if (!error && data) {
      setCategories((prev) => [...prev, data[0]]);
    }
  };

  const addBudget = async (budgetData: Omit<Budget, 'id' | 'current_spent'>) => {
    const today = new Date();
    const existingTxSpent = transactions
      .filter((t) => t.category_id === budgetData.category_id && t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const payload = {
      ...budgetData,
      user_id: authUser?.id,
      current_spent: existingTxSpent,
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };

    const { data, error } = await supabase.from('budgets').insert([payload]).select();
    if (!error && data) {
      setBudgets((prev) => [...prev.filter((b) => b.category_id !== budgetData.category_id), data[0]]);
    }
  };

  return (
    <FinancialContext.Provider
      value={{
        transactions,
        wallets,
        categories,
        budgets,
        user: authUser ? { id: authUser.id, email: authUser.email || '', currency: 'IDR' } : null,
        summary: calculateSummary(),
        isLoading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addWallet,
        updateWallet,
        deleteWallet,
        addCategory,
        addBudget,
        formatCurrency,
        monthlyBudget,
        setMonthlyBudget,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
};
