import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // This check is important for debugging.
  // In a production environment, you'd want more robust error handling.
  console.error('Missing Supabase URL or anon key. Make sure to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.');
  // Return a dummy client or throw an error, depending on desired behavior for a misconfigured state.
  // For now, let's throw to make it obvious during development.
  throw new Error('Missing Supabase URL or anon key.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
