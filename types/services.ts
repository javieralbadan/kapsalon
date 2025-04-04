import type { Database } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { ApiResponse } from './api';

export type ServiceRow = Database['public']['Tables']['services']['Row'];
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];
export type ServiceUI = {
  id: string;
  description?: string | null;
  duration?: number;
  name: string;
  price: number;
  staffMemberId: string;
};

export interface ServiceResponseType {
  data: ServiceRow | null;
  error: PostgrestError | null;
}

export interface ServicesResponseType {
  data: ServiceRow[] | null;
  error: PostgrestError | null;
}

export type ServiceApiResponse = ApiResponse<ServiceRow>;
export type ServicesApiResponse = ApiResponse<ServiceRow[]>;
