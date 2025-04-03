import type { Database } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { ApiResponse } from './api';

export type StaffMemberRow = Database['public']['Tables']['staff']['Row'];
export type StaffMemberInsert = Database['public']['Tables']['staff']['Insert'];
export type StaffMemberUI = {
  id: string;
  name: string;
  email?: string;
  phoneNumber: string;
};

export interface StaffMemberResponseType {
  data: StaffMemberRow | null;
  error: PostgrestError | null;
}

export interface StaffMembersResponseType {
  data: StaffMemberRow[] | null;
  error: PostgrestError | null;
}

export type StaffMemberApiResponse = ApiResponse<StaffMemberRow>;
export type StaffMembersApiResponse = ApiResponse<StaffMemberRow[]>;
