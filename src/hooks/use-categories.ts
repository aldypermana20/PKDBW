import { useEffect, useState, useMemo } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Category } from '@/types/database'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return null
    return createBrowserClient(url, key)
  }, [])

  useEffect(() => {
    let isMounted = true

    async function fetchCategories() {
      if (!supabase) {
        if (isMounted) setLoading(false)
        return
      }
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('user_id', user.id)
          .order('name')

        if (error) throw error

        if (isMounted) {
          setCategories(data || [])
        }
      } catch (err: any) {
        console.error('Error fetching categories:', err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchCategories()

    if (!supabase) return

    // Realtime subscription for categories
    const channel = supabase
      .channel('categories_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        () => fetchCategories()
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const addCategory = async (category: Omit<Category, 'id' | 'created_at' | 'user_id'>) => {
    try {
      if (!supabase) throw new Error('Supabase client is not initialized')

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('categories')
        .insert([{ ...category, user_id: user.id }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err: any) {
      throw err
    }
  }

  return { categories, loading, addCategory }
}
