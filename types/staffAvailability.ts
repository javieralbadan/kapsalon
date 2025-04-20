import type { Database } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { ApiResponse } from './api';
import { GroupListItem } from './ui';

export type StaffAvailabilityRow = Database['public']['Tables']['staff_availability']['Row'];
export type StaffAvailabilityInsert = Database['public']['Tables']['staff_availability']['Insert'];
export type StaffAvailabilityUI = {
  id: string;
  dayOfWeek: number;
  endTime: string;
  isAvailable: boolean;
  staffMemberId: string;
  startTime: string;
};

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
export type StaffAvailableSlot = {
  id: string; // Fecha en ISO (YYYY-MM-DD)
  date: Date; // Fecha completa
  title: string; // Fecha formateada
  slots: GroupListItem[];
};
export type StaffAvailableSlotsApiResponse = {
  data: StaffAvailableSlot[];
  pagination: {
    currentPage: number;
    hasMore: boolean;
  };
};
