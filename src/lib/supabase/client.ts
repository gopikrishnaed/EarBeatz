import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Make sure to set them in your .env.local file.');
}

if (supabaseUrl === 'YOUR_SUPABASE_URL') {
    throw new Error('Invalid Supabase URL: You are using the placeholder value. Please update YOUR_SUPABASE_URL in your .env.local file with your actual Supabase project URL.');
}


// Note: This client is only intended for use on the client side.
// For server-side queries, use the client from `server-client.ts`.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
