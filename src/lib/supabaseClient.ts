import { createClient } from "@supabase/supabase-js";

// Safe retrieval of environment variables
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || "";

export const hasSupabaseConfig = !!(supabaseUrl && supabaseAnonKey);

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!hasSupabaseConfig) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}
