export type TransactionType = 'income' | 'expense';

export type WalletType = 'cash' | 'bank' | 'ewallet' | 'investment';

export interface Wallet {
  id: string;
  user_id?: string;
  name: string;
  type: WalletType;
  balance: number;
  icon?: string;
  account_number?: string;
  is_default?: boolean;
  color?: string;
  created_at?: string;
}

export interface Category {
  id: string;
  user_id?: string;
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
  budget_limit?: number;
}

export interface Transaction {
  id: string;
  user_id?: string;
  title: string;
  amount: number;
  type: TransactionType;
  category_id: string;
  category_name: string;
  category_icon?: string;
  category_color?: string;
  wallet_id: string;
  wallet_name: string;
  date: string;
  notes?: string;
  created_at?: string;
}

export interface Budget {
  id: string;
  user_id?: string;
  category_id: string;
  category_name: string;
  category_icon?: string;
  limit_amount: number;
  current_spent: number;
  month: number;
  year: number;
}

export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  monthlyIncomeChangePercentage: number;
  monthlyExpenseChangePercentage: number;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  currency: string;
}
