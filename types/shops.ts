import type { Database } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export type ShopRow = Database['public']['Tables']['shops']['Row'];
export type ShopInsert = Database['public']['Tables']['shops']['Insert'];

export interface ShopResponseType {
	data: ShopRow | null;
	error: PostgrestError | null;
}

export interface ShopsResponseType {
	data: ShopRow[] | null;
	error: PostgrestError | null;
}
