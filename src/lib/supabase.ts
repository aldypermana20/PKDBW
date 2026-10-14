import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rzlqrjwniygkqufyjjxr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bHFyanduaXlna3F1ZnlqanhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MDIxNzgsImV4cCI6MjEwNjM3ODE3OH0.PR__x_ZyrugpLP8dW8QhomSsaQhikBqVfBY1vMddMl4';

export const isSupabaseConfigured = () => {
  return true; // Paksa selalu true karena kredensial sudah disuntikkan
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
