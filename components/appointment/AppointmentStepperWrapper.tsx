'use client';
import { getServicesFromDB } from '@/api/services';
import { getShopsFromDB } from '@/api/shops';
import { getAvailabilitiesFromDB } from '@/api/staffAvailability';
import { getStaffMembersFromDB } from '@/api/staffMembers';
import AppointmentStepper from '@/components/appointment/AppointmentStepper';
import { ServiceRow } from '@/types/services';
import { StaffAvailabilityRow } from '@/types/staffAvailability';
import { StaffMemberRow } from '@/types/staffMembers';
import { GroupListItem } from '@/types/ui';
import { mapServiceList } from '@/utils/mappers/services';
import { mapStaffList } from '@/utils/mappers/staffMembers';
import { use } from 'react';

const shopsPromise = getShopsFromDB();
const staffPromise = getStaffMembersFromDB();
const servicesPromise = getServicesFromDB();
const slotsPromise = getAvailabilitiesFromDB();

const AppointmentStepperWrapper: React.FC = () => {
	const shopsResponse = use(shopsPromise);
	const shops = (shopsResponse.data as GroupListItem[]) || [];

	const staffResponse = use(staffPromise);
	const barbers = mapStaffList((staffResponse.data as StaffMemberRow[]) || []);

	const servicesResponse = use(servicesPromise);
	const services = mapServiceList((servicesResponse.data as ServiceRow[]) || []);

	const slotsResponse = use(slotsPromise);
	const slots = (slotsResponse.data as StaffAvailabilityRow[]) || [];

	return <AppointmentStepper shops={shops} barbers={barbers} services={services} slots={slots} />;
};

export default AppointmentStepperWrapper;
