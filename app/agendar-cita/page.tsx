'use client';
import { getServicesFromDB } from '@/api/services';
import { getShopsFromDB } from '@/api/shops';
import { getAvailabilitiesFromDB } from '@/api/staffAvailability';
import { getStaffMembersFromDB } from '@/api/staffMembers';
import AppointmentStepper from '@/components/appointment/AppointmentStepper';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { StaffAvailabilityRow } from '@/types/staffAvailability';
import { GroupListItem } from '@/types/ui';
import { mapServiceList } from '@/utils/mappers/services';
import { mapStaffList } from '@/utils/mappers/staffMembers';
import { Suspense, useEffect, useState } from 'react';

const ScheduleAppointment = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [barbers, setBarbers] = useState<GroupListItem[] | []>([]);
	const [services, setServices] = useState<GroupListItem[] | []>([]);
	const [shops, setShops] = useState<GroupListItem[] | []>([]);
	const [availablities, setAvailabilities] = useState<StaffAvailabilityRow[] | []>([]);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const { data: shops, error: errorShops } = await getShopsFromDB();
			// TODO: Delete these logs
			console.log('shops, errorShops', shops, errorShops);
			if (!errorShops && shops?.length) {
				setShops(shops);
			}

			const { data: staff, error: errorStaff } = await getStaffMembersFromDB();
			console.log('staff, errorStaff', staff, errorStaff);
			if (!errorStaff && staff?.length) {
				setBarbers(mapStaffList(staff));
			}

			const { data: services, error: errorServices } = await getServicesFromDB();
			console.log('services, errorServices', services, errorServices);
			if (!errorServices && services?.length) {
				setServices(mapServiceList(services));
			}

			const { data: availablities, error: errorAvails } = await getAvailabilitiesFromDB();
			console.log('availablities, errorAvails', availablities, errorAvails);
			if (!errorAvails && availablities?.length) {
				setAvailabilities(availablities);
			}
			setIsLoading(false);
		};

		void fetchData();
	}, []);

	return (
		<div className="p-4 text-center">
			<h1>Agendar cita</h1>
			<ClientErrorBoundary>
				<Suspense fallback={<Loading />}>
					{isLoading ? (
						<Loading />
					) : (
						<AppointmentStepper
							shops={shops}
							barbers={barbers}
							services={services}
							availablities={availablities}
						/>
					)}
				</Suspense>
			</ClientErrorBoundary>
		</div>
	);
};

export default ScheduleAppointment;
