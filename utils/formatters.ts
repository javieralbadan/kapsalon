const DEFAULT = {
  LANGUAGE: 'es-CO',
  CURRENCY: 'COP',
};

interface FormatDateProps {
  dateString: string;
  options?: Intl.DateTimeFormatOptions;
  locale?: string;
}

interface FormatTimeProps {
  time24h: string;
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
  month: 'long',
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

export const nowInColombia = (): Date => {
  // TODO: Update others new Date();
  const nowUTC = new Date();
  const offsetBogota = -5 * 60; // UTC-5 en minutos
  const offsetLocal = nowUTC.getTimezoneOffset();
  const difference = offsetBogota - offsetLocal;

  return new Date(nowUTC.getTime() + difference * 60 * 1000);
};

// Función para crear fechas con hora local específica
export const createDateWithLocalTime = (date: Date, time: string): Date => {
  // Combina fecha y hora manteniendo la zona horaria local
  const [year, month, day] = date
    .toISOString()
    .split('T')[0]
    .split('-')
    .map((num) => parseInt(num));
  const [hours, minutes] = time.split(':').map((num) => parseInt(num));

  return new Date(year, month - 1, day, hours, minutes);
};

export const createLocalDateString = (date: Date): string => {
  // Formato YYYY-MM-DD para preservar la fecha local
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Para tener el mismo formato que toISOString pero sin conversión a UTC
  // Se usa T00:00:00.000Z para representar el inicio del día
  return `${year}-${month}-${day}T00:00:00.000Z`;
};

export const formatOnlyDate = ({
  dateString,
  options = DEFAULT_DATE_OPTIONS,
  locale = DEFAULT.LANGUAGE,
}: FormatDateProps) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const addDays = (originalDate: Date, numberDays = 1): Date => {
  const cloneDate = new Date(originalDate);
  const newDateObject = cloneDate.setDate(cloneDate.getDate() + numberDays);

  return new Date(newDateObject);
};

export const formatTime = ({
  time24h,
  options = SHORT_TIME_OPTIONS,
  locale = DEFAULT.LANGUAGE,
}: FormatTimeProps): string => {
  const [hours, minutes] = time24h.split(':');
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));

  const formattedTime = new Intl.DateTimeFormat(locale, options).format(date);
  const finalTime = formattedTime.replace(/\.\s?/g, '').replace(/\s/g, ' ');
  // Ej: 11:00 am, 11:30 am, 7:00 pm
  return finalTime;
};

export const formatDateTime = ({
  dateString,
  options = DEFAULT_DATE_TIME_OPTIONS,
  locale = DEFAULT.LANGUAGE,
}: FormatDateProps) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export const getIDFromDateTime = (dateString: Date): string => {
  const year = dateString.getFullYear();
  const month = String(dateString.getMonth() + 1).padStart(2, '0');
  const day = String(dateString.getDate()).padStart(2, '0');
  const hours = String(dateString.getHours()).padStart(2, '0');
  const minutes = String(dateString.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
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

export const formatPhoneNumber = (phone: string): string => {
  const phoneStr = String(phone);
  const cleanPhone = phoneStr.replace(/\D/g, '');

  return cleanPhone.startsWith('57') ? '+' + cleanPhone : '+57' + cleanPhone;
};
