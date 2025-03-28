import type { Database } from '@/types/supabase';
import { GroupListItem } from '@/types/ui';
import { PostgrestError } from '@supabase/supabase-js';
import { ApiResponse } from './api';
import { StaffAvailabilityRow } from './staffAvailability';

export type AppointmentRow = Database['public']['Tables']['appointments']['Row'];
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];
export type AppointmentUpdate = Database['public']['Tables']['appointments']['Update'];
export type AppointmentUI = {
  customerId: string;
  dateTime: string;
  id: string;
  priceOverride?: number | null;
  rating?: number | null;
  serviceId: string;
  staffMemberId: string;
  status: Database['public']['Enums']['appointment_status'];
};

export interface AppointmentResponseType {
  data: AppointmentRow | null;
  error: PostgrestError | null;
}

export interface AppointmentsResponseType {
  data: AppointmentRow[] | null;
  error: PostgrestError | null;
}

export type AppointmentApiResponse = ApiResponse<AppointmentRow>;
export type AppointmentsApiResponse = ApiResponse<AppointmentRow[]>;

export enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export interface AppointmentCreationType {
  barber: GroupListItem;
  service: GroupListItem;
  dayTime: GroupListItem;
  codeOTP: string;
  goBack: () => void;
}

export const APPOINTMENT_INIT_VALUE = {
  barber: { id: '', name: '' },
  service: { id: '', name: '' },
  dayTime: { id: '', name: '' },
  codeOTP: '',
  goBack: () => {},
};

export interface AppointmentStepperProps {
  barbers: GroupListItem[] | [];
  services: GroupListItem[] | [];
  shop: GroupListItem | null;
  availablities: StaffAvailabilityRow[] | [];
}

export interface SetOptionParams {
  key: 'barber' | 'service' | 'dayTime';
  listItem: GroupListItem;
}

export interface BarbersContentProps {
  list: GroupListItem[] | [];
  selectedItemId: string | number | null;
  shop: GroupListItem | null;
  setOption: (params: SetOptionParams) => void;
}

export interface ServicesContentProps {
  list: GroupListItem[] | [];
  selectedItemId: string | number | null;
  setOption: (params: SetOptionParams) => void;
}

export interface SlotContentProps {
  availablities: StaffAvailabilityRow[] | [];
  selectedItemId: string | number | null;
  setOption: (params: SetOptionParams) => void;
}
