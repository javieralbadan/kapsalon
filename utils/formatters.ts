const DEFAULT = {
	LANGUAGE: 'es-CO',
	CURRENCY: 'COP',
};

interface DateProps {
	date: number | Date;
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

export const formatDate = ({
	date,
	options = DEFAULT_DATE_OPTIONS,
	locale = DEFAULT.LANGUAGE,
}: DateProps) => {
	if (!date) {
		return '';
	}

	return new Intl.DateTimeFormat(locale, options).format(date);
};

export const addDays = (originalDate: Date, numberDays = 1): Date => {
	const cloneDate = new Date(originalDate);
	const newDateObject = cloneDate.setDate(cloneDate.getDate() + numberDays);

	return new Date(newDateObject);
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
