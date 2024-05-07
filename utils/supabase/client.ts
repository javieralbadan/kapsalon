import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'noop';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'noop';

export const supabaseClient: SupabaseClient<Database> = createClient(supabaseUrl, supabaseKey);
