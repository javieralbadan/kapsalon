import { Database } from '@/types/supabase';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'noop';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'noop';

export const createAdminClient: SupabaseClient<Database> = createClient(supabaseUrl, supabaseKey);
