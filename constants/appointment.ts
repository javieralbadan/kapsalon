export const SCHEDULE_APPOINTMENT = {
  DAYS_PER_PAGE: 3,
  MAX_APPOINTMENTS_PAGES: 2, // Starting from 0
  MINUTES_TO_INCREASE: 30 * 60 * 1000, // 30 minutes in ms
  TIME_CUTOFF_HOUR: 18, // Skip today
  START_OFFSET_HOURS: 2, // Mínimo de horas antes del primer slot
};
