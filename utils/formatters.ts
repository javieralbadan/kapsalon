const DEFAULT = {
	LANGUAGE: 'es-CO',
	CURRENCY: 'COP',
};

interface FormatDateProps {
	dateISOString: string;
	options?: Intl.DateTimeFormatOptions;
	locale?: string;
}

interface CurrencyProps {
	value: number;
	options?: Intl.NumberFormatOptions;
}

const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	day: 'numeric',
	month: 'short',
	// timeZone: 'America/Bogota',
};

export const SHORT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
};

export const LONG_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
	timeStyle: 'full',
	dateStyle: 'full',
};

export const SHORT_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
	hour: 'numeric',
	minute: '2-digit',
	hour12: true,
};

export const ONLY_HOUR_OPTIONS: Intl.DateTimeFormatOptions = {
	hour: 'numeric',
	hour12: true,
};

export const DEFAULT_DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	hour: 'numeric',
	minute: 'numeric',
	hour12: true,
};

export const formatOnlyDate = ({
	dateISOString,
	options = DEFAULT_DATE_OPTIONS,
	locale = DEFAULT.LANGUAGE,
}: FormatDateProps) => {
	if (!dateISOString) {
		return '';
	}

	const date = new Date(dateISOString);
	return new Intl.DateTimeFormat(locale, options).format(date);
};

export const addDays = (originalDate: Date, numberDays = 1): Date => {
	const cloneDate = new Date(originalDate);
	const newDateObject = cloneDate.setDate(cloneDate.getDate() + numberDays);

	return new Date(newDateObject);
};

export const formatTime = (time24h: string, locale = DEFAULT.LANGUAGE): string => {
	const [hours, minutes] = time24h.split(':');
	const date = new Date();
	date.setHours(parseInt(hours));

	let options = ONLY_HOUR_OPTIONS;
	if (minutes) {
		date.setMinutes(parseInt(minutes));
		options = SHORT_TIME_OPTIONS;
	}

	const formattedTime = new Intl.DateTimeFormat(locale, options).format(date);
	return formattedTime.replaceAll('.', '').replace(/\s*([ap])\s*m\s*$/i, '$1m');
};

export const formatDateTime = ({
	dateISOString,
	options = DEFAULT_DATE_TIME_OPTIONS,
	locale = DEFAULT.LANGUAGE,
}: FormatDateProps) => {
	if (!dateISOString) {
		return '';
	}

	const date = new Date(dateISOString);
	return new Intl.DateTimeFormat(locale, options).format(date);
};

const DEFAULT_CURRENCY_OPTIONS: Intl.NumberFormatOptions = {
	style: 'currency',
	currency: DEFAULT.CURRENCY,
	maximumSignificantDigits: 3,
};

export const formatCurrency = ({ value, options = DEFAULT_CURRENCY_OPTIONS }: CurrencyProps) => {
	if (!value) {
		return '';
	}

	const formatter = new Intl.NumberFormat(DEFAULT.LANGUAGE, options);
	return formatter.format(value);
};
