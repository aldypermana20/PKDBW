export type TransactionType = 'income' | 'expense'

export interface Category {
  id: string
  name: string
  type: TransactionType
  icon: string 
  color?: string
  is_default?: boolean
  user_id: string
  created_at?: string
}

export interface Transaction {
  id: string
  amount: number
  type: TransactionType
  category_id: string | null
  wallet_id?: string | null
  description: string
  date: string
  user_id: string
  created_at?: string
  updated_at?: string
  
  // Joined relation field
  category?: Category | null
}
