import { PostgrestError } from '@supabase/supabase-js';
import type { Database } from 'types/supabase';

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
