import { GroupListItem } from '@/types/ui';
import { StaffAvailabilityRow } from './staffAvailability';

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
