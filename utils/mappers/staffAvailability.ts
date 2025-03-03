import { StaffAvailabilityRow } from '@/types/staffAvailability';
import { GroupListItem } from '@/types/ui';
import { addDays, formatOnlyDate, formatTime } from '@/utils/formatters';

interface Props {
	dateISOString: string;
	startTime: string;
	endTime: string;
}

const DAYS_TO_SHOW = 10;
const MINUTES_TO_INCREASE = 30;
const TODAY: Date = new Date();
const TOMORROW: Date = addDays(TODAY, 1);
const ENABLE_TODAY = TODAY.getHours() < 12;

export const getUpcomingDays = (availabilities: StaffAvailabilityRow[]): GroupListItem[] => {
	const availableDays: GroupListItem[] = [];

	const availableDaysOfWeek = availabilities
		.filter(({ is_available }) => is_available)
		.map(({ day_of_week }) => day_of_week)
		.sort((a, b) => a - b);

	let currentDay: Date = ENABLE_TODAY ? TODAY : TOMORROW;
	let daysAdded: number = 0;

	while (daysAdded < DAYS_TO_SHOW) {
		const dayOfWeek: number = currentDay.getDay();

		if (availableDaysOfWeek.includes(dayOfWeek)) {
			const isAlreadyAdded = availableDays.some(
				({ id }) => currentDay.getTime() === new Date(id).getTime(),
			);

			if (!isAlreadyAdded) {
				availableDays.push({
					id: currentDay.toISOString(),
					name: formatOnlyDate({ dateISOString: currentDay.toISOString() }),
				});
			}

			daysAdded++;
		}

		currentDay = addDays(currentDay, 1);
	}

	return availableDays;
};

export const mapTimeSlotList = ({ dateISOString, startTime, endTime }: Props): GroupListItem[] => {
	const date = dateISOString.split('T')[0]; // Obtiene "2025-02-28" de "2025-02-28T14:30:00.000Z"
	// Crear objetos Date (inicio y fin) con fecha ISO String pero con las horas especificadas
	let startDateTime: Date = new Date(`${date}T${startTime}`);
	const endDateTime: Date = new Date(`${date}T${endTime}`);
	const timeSlots: GroupListItem[] = [];

	while (startDateTime < endDateTime) {
		// Crear un ISO string preciso para este intervalo específico
		const slotDate = new Date(
			startDateTime.getFullYear(),
			startDateTime.getMonth(),
			startDateTime.getDate(),
			startDateTime.getHours(),
			startDateTime.getMinutes(),
		);

		timeSlots.push({
			id: slotDate.toISOString(), // ISO string preciso que incluye año, mes, día, hora, minutos
			name: formatTime({ time24h: slotDate.toISOString().split('T')[1] }),
		});

		const nextTimeSlot = startDateTime.getMinutes() + MINUTES_TO_INCREASE;
		startDateTime = new Date(startDateTime.setMinutes(nextTimeSlot));
	}

	return timeSlots;
};
