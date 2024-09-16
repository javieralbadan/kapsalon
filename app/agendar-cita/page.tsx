'use client';
import { AppointmentCarousel } from '@/components/AppointmentCarousel';
import { Loading } from '@/components/ui/Loading';
import { getServicesFromDB } from '@/db/services';
import { getShopsFromDB } from '@/db/shops';
import { getAvailabilitiesFromDB } from '@/db/staffAvailability';
import { getStaffMembersFromDB } from '@/db/staffMembers';
import { StaffAvailabilityRow } from '@/types/staffAvailability';
import { GroupListItem } from '@/types/ui';
import { mapServiceList } from '@/utils/mappers/services';
import { mapStaffList } from '@/utils/mappers/staffMembers';
import { Empty } from 'antd';
import { useEffect, useState } from 'react';

const ScheduleAppointment = () => {
	const [isError, setError] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [barbersList, setBarbersList] = useState<GroupListItem[] | []>([]);
	const [servicesList, setServicesList] = useState<GroupListItem[] | []>([]);
	const [shopsList, setShopsList] = useState<GroupListItem[] | []>([]);
	const [availabilitiesList, setAvailabilitiesList] = useState<StaffAvailabilityRow[] | []>([]);

	useEffect(() => {
		const fetchData = async () => {
			const { data: shops, error: errorShops } = await getShopsFromDB();
			// TODO: Delete these logs
			console.log('errorShops, shops', errorShops, shops);
			if (!errorShops && shops?.length) {
				setShopsList(shops);
			}

			const { data: staff, error: errorStaff } = await getStaffMembersFromDB();
			console.log('errorStaff, staff', errorStaff, staff);
			if (!errorStaff && staff?.length) {
				setBarbersList(mapStaffList(staff));
			}

			const { data: services, error: errorServices } = await getServicesFromDB();
			console.log('errorServices, services', errorServices, services);
			if (!errorServices && services?.length) {
				setServicesList(mapServiceList(services));
			}

			const { data: slots, error: errorAvailability } = await getAvailabilitiesFromDB();
			console.log('errorAvailability, slots', errorAvailability, slots);
			if (!errorAvailability && slots?.length) {
				setAvailabilitiesList(slots);
			}

			const generalError: boolean =
				!!errorShops || !!errorStaff || !!errorServices || !!errorAvailability;

			setError(generalError);
			setLoading(false);
		};

		void fetchData();
	}, []);

	return (
		<div className="p-4 text-center">
			<h1>Agendar cita</h1>
			{isLoading && <Loading />}
			{!isLoading && isError && (
				<div className="flex h-[calc(100vh-180px)] items-center justify-center">
					<Empty description="No fue posible cargar los datos" />
				</div>
			)}
			{!isLoading && !isError && (
				<AppointmentCarousel
					shopsList={shopsList}
					barbersList={barbersList}
					servicesList={servicesList}
					availabilitiesList={availabilitiesList}
				/>
			)}
		</div>
	);
};

export default ScheduleAppointment;
