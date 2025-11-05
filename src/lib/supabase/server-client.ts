// IMPORTANT: This file is only used on the server.
// See `client.ts` for the client-side Supabase client.
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or anon key. Make sure to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.');
}

if (supabaseUrl === 'YOUR_SUPABASE_URL') {
    throw new Error('Invalid Supabase URL: You are using the placeholder value. Please update YOUR_SUPABASE_URL in your .env.local file with your actual Supabase project URL.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
