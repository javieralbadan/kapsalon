import type { Database } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { ApiResponse } from './api';

export type ShopRow = Database['public']['Tables']['shops']['Row'];
export type ShopInsert = Database['public']['Tables']['shops']['Insert'];
export type ShopUI = {
  id: string;
  name: string;
  address: string;
  logo?: string | null;
};

export interface ShopResponseType {
  data: ShopRow | null;
  error: PostgrestError | null;
}

export interface ShopsResponseType {
  data: ShopRow[] | null;
  error: PostgrestError | null;
}

export type ShopApiResponse = ApiResponse<ShopRow>;
export type ShopsApiResponse = ApiResponse<ShopRow[]>;
