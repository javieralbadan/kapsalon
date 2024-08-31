'use server';

import { AppointmentCarousel } from '@/components/AppointmentCarousel';
import { GroupListItem } from 'types/ui';

// import { fetchStaffByShop } from './actions';

const ScheduleAppointment = () => {
	const barbersList: GroupListItem[] = [
		{
			id: 'david',
			text: 'David Rodríguez',
		},
	];

	const servicesList: GroupListItem[] = [
		{
			id: 'corte',
			text: 'Corte de cabello',
		},
		{
			id: 'corte-y-barba',
			text: 'Corte con barba',
		},
		{
			id: 'barba',
			text: 'Barba',
		},
		{
			id: 'linea',
			text: 'Linea',
		},
	];

	const daysList: GroupListItem[] = [
		{
			id: '02-09-2024',
			text: 'Lunes 2 de Septiembre',
		},
		{
			id: '03-09-2024',
			text: 'Martes 3 de Septiembre',
		},
		{
			id: '04-09-2024',
			text: 'Miércoles 4 de Septiembre',
		},
		{
			id: '05-09-2024',
			text: 'Jueves 5 de Septiembre',
		},
	];

	const timesList: GroupListItem[] = [
		{
			id: '10:00',
			text: '10:00',
		},
		{
			id: '11:00',
			text: '11:00',
		},
		{
			id: '12:00',
			text: '12:00',
		},
		{
			id: '13:00',
			text: '13:00',
		},
		{
			id: '14:00',
			text: '14:00',
		},
	];

	return (
		<main className="p-4 text-center">
			<h1>Agendar cita</h1>
			<AppointmentCarousel
				barbersList={barbersList}
				servicesList={servicesList}
				daysList={daysList}
				timesList={timesList}
			/>
		</main>
	);
};

export default ScheduleAppointment;
