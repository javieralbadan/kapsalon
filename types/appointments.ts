enum AppointmentStatus {
	Pending = 'pending',
	Confirmed = 'confirmed',
	Completed = 'completed',
	Cancelled = 'cancelled',
}

export interface AppointmentType {
	// ... otros campos
	status: AppointmentStatus;
}
