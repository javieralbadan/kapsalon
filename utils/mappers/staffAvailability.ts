import { StaffAvailabilityRow } from '@/types/staffAvailability';
import { GroupListItem } from '@/types/ui';
import {
	addDays,
	formatDate,
	LONG_DATE_OPTIONS,
	SHORT_DATE_OPTIONS,
	SHORT_TIME_OPTIONS,
} from '@/utils/formatters';

interface Props {
	date: string;
	startTime: string;
	endTime: string;
}

const DAYS_TO_SHOW = 10;
const MINUTES_TO_INCREASE = 30;
const TODAY: Date = new Date();
const TOMORROW: Date = addDays(TODAY, 1);
const ENABLE_TODAY = TODAY.getHours() < 12;
const YYYY_MM_DD_FORMAT = 'en-CA';

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
					id: formatDate({
						date: currentDay,
						options: SHORT_DATE_OPTIONS,
						locale: YYYY_MM_DD_FORMAT,
					}),
					name: formatDate({ date: currentDay }),
				});
			}

			daysAdded++;
		}

		currentDay = addDays(currentDay, 1);
	}

	return availableDays;
};

export const mapTimeSlotList = ({ date, startTime, endTime }: Props): GroupListItem[] => {
	let startDateTime: Date = new Date(`${date}T${startTime}`);
	const endDateTime: Date = new Date(`${date}T${endTime}`);
	const timeSlots: GroupListItem[] = [];

	while (startDateTime < endDateTime) {
		timeSlots.push({
			id: formatDate({
				date: startDateTime,
				options: LONG_DATE_OPTIONS,
				locale: YYYY_MM_DD_FORMAT,
			}),
			name: formatDate({ date: startDateTime, options: SHORT_TIME_OPTIONS }),
		});

		const nextTimeSlot = startDateTime.getMinutes() + MINUTES_TO_INCREASE;
		startDateTime = new Date(startDateTime.setMinutes(nextTimeSlot));
	}

	return timeSlots;
};
