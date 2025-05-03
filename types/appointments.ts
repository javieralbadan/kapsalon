import type { Database } from '@/types/supabase';
import { GroupListItem } from '@/types/ui';
import { PostgrestError } from '@supabase/supabase-js';
import { ApiResponse } from './api';
import { CustomerRow, CustomerUI } from './customers';
import { ServiceRow } from './services';
import { ShopRow, ShopUI } from './shops';
import { StaffMemberRow, StaffMemberUI } from './staffMembers';

export type AppointmentRow = Database['public']['Tables']['appointments']['Row'];
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];
export type AppointmentUpdate = Database['public']['Tables']['appointments']['Update'];
export type AppointmentCancel = Pick<AppointmentRow, 'status' | 'updated_at'>;
export type AppointmentUI = {
  id: string;
  dateTime: string;
  customerId: string;
  staffMemberId: string;
  serviceId: string;
  status: Database['public']['Enums']['appointment_status'];
  dateTimeISO?: string;
  priceOverride?: number | null;
  rating?: number | null;
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
export type AppointmentDetailsData = AppointmentRow & {
  customers?: Pick<CustomerRow, 'first_name' | 'last_name' | 'phone_number'> | null;
  services?: Pick<ServiceRow, 'name' | 'price'> | null;
  staff?:
    | (Pick<StaffMemberRow, 'first_name' | 'last_name' | 'phone_number'> & {
        shops: ShopRow;
      })
    | null;
};
export type AppointmentValidDetailsData = AppointmentRow & {
  customers: Pick<CustomerRow, 'first_name' | 'last_name' | 'phone_number'>;
  services: Pick<ServiceRow, 'name' | 'price'>;
  staff: Pick<StaffMemberRow, 'first_name' | 'last_name' | 'phone_number'> & {
    shops: ShopRow;
  };
};
export type AppointmentDetailsApiResponse = ApiResponse<AppointmentDetailsData>;
export type AppointmentsDetailsApiResponse = ApiResponse<AppointmentDetailsData[]>;

export enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Completed = 'completed',
  Rescheduled = 'rescheduled',
  Cancelled = 'cancelled',
}

export interface AppointmentCreationType {
  shop: ShopUI;
  barber: StaffMemberUI;
  service: GroupListItem;
  dateTime: GroupListItem;
  codeOTP: string;
  goBack: () => void;
}

export interface AppointmentEditionType {
  appt: AppointmentUI;
  customer: CustomerUI;
  shop: ShopUI;
  barber: StaffMemberUI;
  service: GroupListItem;
  dateTime: GroupListItem;
}

export interface ApptActionEditionType extends AppointmentEditionType {
  isInTheFuture: boolean;
}

export const APPOINTMENT_INIT_VALUE = {
  barber: { id: '', name: '', email: '', phoneNumber: '' },
  service: { id: '', name: '' },
  dateTime: { id: '', name: '' },
  codeOTP: '',
  goBack: () => {},
};

export interface SetOptionParams {
  key: 'shop' | 'barber' | 'service' | 'dateTime';
  listItem: GroupListItem;
}

export interface BarbersContentProps {
  shop: ShopUI;
  selectedItemId: string | number | null;
  setOption: (params: SetOptionParams) => void;
}

export interface ServicesContentProps {
  barber: StaffMemberUI;
  selectedItemId: string | number | null;
  setOption: (params: SetOptionParams) => void;
}

export interface SlotContentProps {
  barber: StaffMemberUI;
  selectedItemId: string | number | null;
  setOption: (params: SetOptionParams) => void;
}
