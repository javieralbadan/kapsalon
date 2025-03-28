import type { Database } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { ApiResponse } from './api';

export type CustomerRow = Database['public']['Tables']['customers']['Row'];
export type CustomerInsert = Database['public']['Tables']['customers']['Insert'];
export type CustomerUpdate = Database['public']['Tables']['customers']['Update'];
export type CustomerUI = {
  createdAt?: string;
  email?: string | null;
  firstName: string;
  id: string;
  lastName: string;
  lastSession?: string | null;
  phoneNumber: string;
  phoneVerified: boolean;
};

export interface CustomerResponseType {
  data: CustomerRow | null;
  error: PostgrestError | null;
}

export interface CustomersResponseType {
  data: CustomerRow[] | null;
  error: PostgrestError | null;
}

export type CustomerApiResponse = ApiResponse<CustomerRow>;
export type CustomersApiResponse = ApiResponse<CustomerRow[]>;
