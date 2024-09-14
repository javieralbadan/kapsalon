import { StaffAvailabilityRow } from '@/types/staffAvailability';
import { GroupListItem, SlotOption } from '@/types/ui';
import { addDays, format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
	startTime: string;
	endTime: string;
}

const DAYS_TO_SHOW = 10;
const MINUTES_TO_INCREASE = 30;
const TODAY = new Date();

export const getUpcomingDays = (availabilities: StaffAvailabilityRow[]): SlotOption[] => {
	const availableDays: SlotOption[] = [];

	const availableDaysOfWeek = availabilities
		.filter(({ is_available }) => is_available)
		.map(({ day_of_week }) => day_of_week);

	console.log('availableDaysOfWeek', availableDaysOfWeek);

	let currentDay: Date = TODAY;
	let daysAdded: number = 0;

	while (daysAdded < DAYS_TO_SHOW) {
		const dayOfWeek = currentDay.getDay();

		if (availableDaysOfWeek.includes(dayOfWeek)) {
			const isAlreadyAdded = availableDays.some(({ date }) => isSameDay(date, currentDay));
			if (!isAlreadyAdded) {
				const item: SlotOption = {
					id: format(currentDay, 'yyyy-MM-dd'),
					name: format(currentDay, 'EEEE, MMM. d', { locale: es }),
					date: new Date(currentDay),
				};
				availableDays.push(item);
			}
			daysAdded++;
		}

		currentDay = addDays(currentDay, 1);
	}

	return availableDays;
};

export const mapTimeSlotList = ({ startTime, endTime }: Props): GroupListItem[] => {
	const startDateTime = new Date(`1970-01-01T${startTime}`);
	const endDateTime = new Date(`1970-01-01T${endTime}`);
	const timeSlots: GroupListItem[] = [];

	while (startDateTime < endDateTime) {
		timeSlots.push({
			id: format(startDateTime, 'HH:mm'),
			name: format(startDateTime, 'h:mm a'),
		});

		startDateTime.setMinutes(startDateTime.getMinutes() + MINUTES_TO_INCREASE);
	}

	return timeSlots;
};
