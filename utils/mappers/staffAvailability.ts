import { SCHEDULE_APPOINTMENT } from '@/constants/dates';
import { StaffAvailabilityRow } from '@/types/staffAvailability';
import { GroupListItem } from '@/types/ui';
import {
	addDays,
	createDateWithLocalTime,
	createLocalDateString,
	formatOnlyDate,
	formatTime,
} from '@/utils/formatters';

interface TimeSlotProps {
	dateString: string;
	startTime: string;
	endTime: string;
}

interface DayTimeRangeProps {
	availablities: StaffAvailabilityRow[] | [];
	extensionCount: number;
	dayTimeMap: Map<string, GroupListItem[]>;
}

const TODAY: Date = new Date();
const TOMORROW: Date = addDays(TODAY, 1);
const ENABLE_TODAY = TODAY.getHours() < 12;

export const getUpcomingDays = (
	availabilities: StaffAvailabilityRow[],
	extensionCount: number = 0,
): GroupListItem[] => {
	const validExtensionCount = Math.min(extensionCount, SCHEDULE_APPOINTMENT.MAX_DAYS_EXTENSIONS);
	const daysToShow = SCHEDULE_APPOINTMENT.DEFAULT_DAYS_TO_SHOW * (validExtensionCount + 1);

	const availableDays: GroupListItem[] = [];

	const availableDaysOfWeek = availabilities
		.filter(({ is_available }) => is_available)
		.map(({ day_of_week }) => day_of_week)
		.sort((a, b) => a - b);

	let currentDay: Date = ENABLE_TODAY ? TODAY : TOMORROW;
	let daysAdded: number = 0;

	while (daysAdded < daysToShow) {
		const dayOfWeek: number = currentDay.getDay();

		if (availableDaysOfWeek.includes(dayOfWeek)) {
			const isAlreadyAdded = availableDays.some(({ id }) => {
				const idDate = new Date(id as string);
				return (
					// Compara las fechas ignorando la hora
					idDate.getFullYear() === currentDay.getFullYear() &&
					idDate.getMonth() === currentDay.getMonth() &&
					idDate.getDate() === currentDay.getDate()
				);
			});

			const dateString = createLocalDateString(currentDay);
			if (!isAlreadyAdded) {
				availableDays.push({
					id: dateString,
					name: formatOnlyDate({ dateString }),
				});
			}

			daysAdded++;
		}

		currentDay = addDays(currentDay, 1);
	}

	return availableDays;
};

export const mapTimeSlotList = ({
	dateString,
	startTime,
	endTime,
}: TimeSlotProps): GroupListItem[] => {
	// Obtiene "2025-02-28" de "2025-02-28T14:30:00.000Z"
	const date = dateString.split('T')[0];

	// Crear objetos Date para inicio y fin usando hora local
	let startDateTime = createDateWithLocalTime(date, startTime);
	const endDateTime = createDateWithLocalTime(date, endTime);
	const timeSlots: GroupListItem[] = [];

	while (startDateTime < endDateTime) {
		// Formato para el nombre del intervalo - Extrae "HH:MM"
		const timeString = startDateTime.toTimeString().split(' ')[0].substring(0, 5);

		timeSlots.push({
			id: startDateTime.toISOString(),
			name: formatTime({ time24h: timeString }),
		});

		const nextTimeSlot = startDateTime.getMinutes() + SCHEDULE_APPOINTMENT.MINUTES_TO_INCREASE;
		startDateTime = new Date(startDateTime.setMinutes(nextTimeSlot));
	}

	return timeSlots;
};

export const getDayTimeRange = ({
	availablities,
	extensionCount,
	dayTimeMap,
}: DayTimeRangeProps) => {
	const daysList = getUpcomingDays(availablities, extensionCount);
	const dayTimeRange = new Map<string, GroupListItem[]>(dayTimeMap);

	daysList.forEach((day) => {
		const dateString = day.id as string;

		if (!dayTimeRange.has(dateString)) {
			const dayOfWeek = new Date(dateString).getDay();
			const availableDay = availablities.find((item) => item.day_of_week === dayOfWeek);

			if (availableDay) {
				const timeSlots = mapTimeSlotList({
					dateString,
					startTime: availableDay.start_time,
					endTime: availableDay.end_time,
				});

				dayTimeRange.set(dateString, timeSlots);
			}
		}
	});

	return dayTimeRange;
};
