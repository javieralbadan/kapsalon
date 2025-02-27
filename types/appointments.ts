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
	day: GroupListItem;
	time: GroupListItem;
}

export interface AppointmentType {
	// ... otros campos
	status: AppointmentStatus;
}

export interface AppointmentStepperProps {
	barbers: GroupListItem[] | [];
	services: GroupListItem[] | [];
	shops: GroupListItem[] | [];
	slots: StaffAvailabilityRow[] | [];
}

export interface SetOptionParams {
	key: 'barber' | 'service' | 'dayTime';
	listItem: GroupListItem;
	timeItem?: GroupListItem;
}

export interface BarbersContentProps {
	list: GroupListItem[] | [];
	shops: GroupListItem[] | [];
	setOption: (params: SetOptionParams) => void;
}

export interface ServicesContentProps {
	list: GroupListItem[] | [];
	setOption: (params: SetOptionParams) => void;
}

export interface SlotContentProps {
	list: Map<string, GroupListItem[]>;
	slots: StaffAvailabilityRow[] | [];
	setOption: (params: SetOptionParams) => void;
}
