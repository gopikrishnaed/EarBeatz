// IMPORTANT: This file is only used on the server.
// See `client.ts` for the client-side Supabase client.
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/supabase';

// Note: supabaseAdminKey should be used with caution and only when necessary,
// as it bypasses RLS rules.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or anon key. Check .env.local');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
