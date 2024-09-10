'use client';
import { AppointmentCarousel } from '@/components/AppointmentCarousel';
import { Loading } from '@/components/ui/Loading';
import { getServicesFromDB } from '@/db/services';
import { getShopsFromDB } from '@/db/shops';
import { getStaffMembersFromDB } from '@/db/staffMembers';
import { mapStaffList } from '@/utils/mappers/staffMembers';
import { Empty } from 'antd';
import { useEffect, useState } from 'react';
import { GroupListItem } from 'types/ui';

const ScheduleAppointment = () => {
	const [isError, setError] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [barbersList, setBarbersList] = useState<GroupListItem[] | []>([]);
	const [servicesList, setServicesList] = useState<GroupListItem[] | []>([]);
	const [shopsList, setShopsList] = useState<GroupListItem[] | []>([]);

	useEffect(() => {
		const fetchData = async () => {
			const { data: shops, error: errorShops } = await getShopsFromDB();
			if (!errorShops && shops?.length) {
				setShopsList(shops);
			}

			const { data: staff, error: errorStaff } = await getStaffMembersFromDB();
			if (!errorStaff && staff?.length) {
				setBarbersList(mapStaffList(staff));
			}

			const { data: services, error: errorServices } = await getServicesFromDB();
			if (!errorServices && services?.length) {
				setServicesList(services);
			}

			const generalError: boolean = !!errorShops || !!errorStaff || !!errorServices;
			setError(generalError);
			setLoading(false);
		};

		void fetchData();
	}, []);

	const daysList: GroupListItem[] = [
		{
			id: '02-09-2024',
			name: 'Lunes 2 de Septiembre',
		},
		{
			id: '03-09-2024',
			name: 'Martes 3 de Septiembre',
		},
		{
			id: '04-09-2024',
			name: 'Miércoles 4 de Septiembre',
		},
		{
			id: '05-09-2024',
			name: 'Jueves 5 de Septiembre',
		},
	];

	const timesList: GroupListItem[] = [
		{
			id: '10:00',
			name: '10:00',
		},
		{
			id: '11:00',
			name: '11:00',
		},
		{
			id: '12:00',
			name: '12:00',
		},
		{
			id: '13:00',
			name: '13:00',
		},
		{
			id: '14:00',
			name: '14:00',
		},
	];

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
					barbersList={barbersList}
					servicesList={servicesList}
					daysList={daysList}
					shopsList={shopsList}
					timesList={timesList}
				/>
			)}
		</div>
	);
};

export default ScheduleAppointment;
