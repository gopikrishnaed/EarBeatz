import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// This client is intended for server-side use only, where you need to bypass RLS.
// It uses the SERVICE_ROLE_KEY and should be handled with care.
export const serviceRoleClient = createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    }
});
