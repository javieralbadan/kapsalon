import type { Database } from '@/types/supabase';
import { GroupListItem } from '@/types/ui';
import { PostgrestError } from '@supabase/supabase-js';
import { StaffAvailabilityRow } from './staffAvailability';

export type AppointmentRow = Database['public']['Tables']['appointments']['Row'];
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];

export interface AppointmentResponseType {
  data: AppointmentRow | null;
  error: PostgrestError | null;
}

export interface AppointmentsResponseType {
  data: AppointmentRow[] | null;
  error: PostgrestError | null;
}

enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export interface AppointmentCreationType {
  barber: GroupListItem;
  service: GroupListItem;
  dayTime: GroupListItem;
}

export interface AppointmentType {
  // ... otros campos
  status: AppointmentStatus;
}

export interface AppointmentStepperProps {
  barbers: GroupListItem[] | [];
  services: GroupListItem[] | [];
  shops: GroupListItem[] | [];
  availablities: StaffAvailabilityRow[] | [];
}

export interface SetOptionParams {
  key: 'barber' | 'service' | 'dayTime';
  listItem: GroupListItem;
}

export interface BarbersContentProps {
  list: GroupListItem[] | [];
  selectedItemId: string | number | null;
  shops: GroupListItem[] | [];
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
