import { GroupListItem } from '@/types/ui';

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
