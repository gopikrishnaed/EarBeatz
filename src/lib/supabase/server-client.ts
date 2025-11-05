// IMPORTANT: This file is only used on the server.
// See `client.ts` for the client-side Supabase client.
import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/supabase';

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a server environment.
// It bypasses all Row Level Security policies.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;


if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase URL or Service Role Key. Make sure to set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file.');
}

if (supabaseUrl === 'YOUR_SUPABASE_URL') {
    throw new Error('Invalid Supabase URL: You are using the placeholder value. Please update YOUR_SUPABASE_URL in your .env.local file with your actual Supabase project URL.');
}

if (supabaseServiceKey === 'YOUR_SUPABASE_SERVICE_ROLE_KEY') {
    throw new Error('Invalid Supabase Service Role Key: You are using the placeholder value. Please update SUPABASE_SERVICE_ROLE_KEY in your .env.local file with your actual Supabase service key.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    // It is recommended to set autoRefreshToken to false when using the service_role key.
    autoRefreshToken: false,
    persistSession: false
  }
});
