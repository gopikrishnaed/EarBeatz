import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anon key. Make sure to set them in your .env.local file.');
}

// Note: This client is only intended for use on the client side.
// For server-side queries, use the client from `server-client.ts`.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
