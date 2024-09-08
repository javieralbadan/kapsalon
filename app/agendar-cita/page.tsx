'use server';
import { AppointmentCarousel } from '@/components/AppointmentCarousel';
import { Empty } from 'antd';
import { ServicesResponseType } from 'types/services';
import { StaffMembersResponseType } from 'types/staffMembers';
import { GroupListItem } from 'types/ui';
import { fetchServices, fetchStaffMembers } from './actions';

const ScheduleAppointment = async () => {
	const { data: staff, error: error1 }: StaffMembersResponseType = await fetchStaffMembers();
	console.log('🚀 ~ ScheduleAppointment ~ staff, error:', staff, error1);

	const barbersList: GroupListItem[] | [] =
		staff?.map(({ id, first_name, last_name }) => ({
			id,
			name: `${first_name} ${last_name}`,
		})) || [];
	console.log('🚀 ~ ScheduleAppointment ~ barbersList:', barbersList);

	const { data: services, error: error2 }: ServicesResponseType = await fetchServices();
	console.log('🚀 ~ ScheduleAppointment ~ services, error:', services, error2);

	const allServicesList: GroupListItem[] | [] =
		services?.map(({ id, name }) => ({ id, name })) || [];
	console.log('🚀 ~ ScheduleAppointment ~ allServicesList:', allServicesList);

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

	const error: boolean = !!error1 || !!error2;

	return (
		<div className="p-4 text-center">
			<h1>Agendar cita</h1>
			{!error ? (
				<AppointmentCarousel
					barbersList={barbersList}
					servicesList={allServicesList}
					daysList={daysList}
					timesList={timesList}
				/>
			) : (
				<div className="flex h-[calc(100vh-180px)] items-center justify-center">
					<Empty description="No fue posible cargar los datos" />
				</div>
			)}
		</div>
	);
};

export default ScheduleAppointment;
