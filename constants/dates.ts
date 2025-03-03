export const MONTHS = [
	{ key: 'january', value: 'January' },
	{ key: 'february', value: 'February' },
	{ key: 'march', value: 'March' },
	{ key: 'april', value: 'April' },
	{ key: 'may', value: 'May' },
	{ key: 'june', value: 'June' },
	{ key: 'july', value: 'July' },
	{ key: 'august', value: 'August' },
	{ key: 'september', value: 'September' },
	{ key: 'october', value: 'October' },
	{ key: 'november', value: 'November' },
	{ key: 'december', value: 'December' },
];

const currentYear = new Date().getFullYear();
const currentYearString = currentYear.toString();
const nextYear = currentYear + 1;
const nextYearString = nextYear.toString();

export const YEARS = [
	{ key: currentYearString, value: currentYearString },
	{ key: nextYearString, value: nextYearString },
];

// TODO: Move to another constant file
export const SCHEDULE_APPOINTMENT = {
	DEFAULT_DAYS_TO_SHOW: 3,
	MAX_DAYS_EXTENSIONS: 2,
	MINUTES_TO_INCREASE: 30,
};
