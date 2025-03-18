import type { Database } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export type CustomerRow = Database['public']['Tables']['customers']['Row'];
export type CustomerInsert = Database['public']['Tables']['customers']['Insert'];

export interface CustomerResponseType {
  data: CustomerRow | null;
  error: PostgrestError | null;
}

export interface CustomersResponseType {
  data: CustomerRow[] | null;
  error: PostgrestError | null;
}
