import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Category } from '@/types/database'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    let isMounted = true

    async function fetchCategories() {
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
