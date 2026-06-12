import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Transaction } from '@/types/database'

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    let isMounted = true

    async function fetchTransactions() {
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          setError('User not authenticated')
          setLoading(false)
          return
        }

        const { data, error: fetchError } = await supabase
          .from('transactions')
          .select(`
            *,
            category:categories(*)
          `)
          .eq('user_id', user.id)
          .order('date', { ascending: false })

        if (fetchError) throw fetchError

        if (isMounted) {
          setTransactions(data || [])
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchTransactions()

    // Subscribe to realtime changes
    const channel = supabase
      .channel('transactions_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        (payload) => {
          // Re-fetch everything to ensure relationships (like category) are updated correctly
          // Alternatively, we could update the state locally, but refetching is simpler and robust
          fetchTransactions()
        }
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'created_at' | 'user_id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('transactions')
        .insert([{ ...transaction, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err: any) {
      throw err
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (err: any) {
      throw err
    }
  }

  return { transactions, loading, error, addTransaction, deleteTransaction }
}
