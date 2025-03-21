import type { Database } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { ApiResponse } from './api';

export type StaffAvailabilityRow = Database['public']['Tables']['staff_availability']['Row'];
export type StaffAvailabilityInsert = Database['public']['Tables']['staff_availability']['Insert'];

export interface StaffAvailabilityResponseType {
  data: StaffAvailabilityRow | null;
  error: PostgrestError | null;
}

export interface StaffAvailabilitiesResponseType {
  data: StaffAvailabilityRow[] | null;
  error: PostgrestError | null;
}

export interface AvailabilitySlot {
  id: 'string';
  startTime: 'string';
  endTime: 'string';
}

export type StaffAvailabilityApiResponse = ApiResponse<StaffAvailabilityRow>;
export type StaffAvailabilitiesApiResponse = ApiResponse<StaffAvailabilityRow[]>;
