import { SCHEDULE_APPOINTMENT } from '@/constants/appointment';
import { AppointmentRow } from '@/types/appointments';
import { StaffAvailabilityRow, StaffAvailableSlot } from '@/types/staffAvailability';
import { GroupListItem } from '@/types/ui';
import {
  addDays,
  createDateWithLocalTime,
  formatOnlyDate,
  formatTime,
  getIDFromDateTime,
  nowInColombia,
} from '../formatters';

interface DateRange {
  start: Date;
  end: Date;
}

function shouldSkipToday() {
  const now = new Date();
  return now.getHours() >= SCHEDULE_APPOINTMENT.TIME_CUTOFF_HOUR;
}

export function getDateRange(page: number): DateRange {
  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);

  if (shouldSkipToday()) {
    baseDate.setDate(baseDate.getDate() + 1);
  }

  const startDate = addDays(baseDate, page * SCHEDULE_APPOINTMENT.DAYS_PER_PAGE);
  const endDate = addDays(startDate, SCHEDULE_APPOINTMENT.DAYS_PER_PAGE - 1);

  return { start: startDate, end: endDate };
}

export function generateAvailableSlots(
  availabilities: StaffAvailabilityRow[],
  appointments: AppointmentRow[],
  dateRange: DateRange,
): StaffAvailableSlot[] {
  const upcomingAvailableDays = getAvailableDays(availabilities, dateRange);

  const daysWithAvailableSlots = upcomingAvailableDays
    .map((currentDate) => {
      const staffAvailDay = availabilities.find((a) => a.day_of_week === currentDate.getDay())!;
      const allSlots = generateTimeSlots(currentDate, staffAvailDay);
      const availableSlots = removeBookedSlots(appointments, allSlots);

      return {
        id: currentDate.toISOString().split('T')[0], // YYYY-MM-DD
        date: new Date(currentDate),
        title: formatOnlyDate({ dateString: currentDate.toISOString() }),
        slots: availableSlots,
      };
    })
    .filter((day) => day.slots.length > 0);

  return daysWithAvailableSlots.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function getAvailableDays(availabilities: StaffAvailabilityRow[], dateRange: DateRange): Date[] {
  const availableDaysOfWeek = availabilities
    .filter((a) => a.is_available)
    .map((a) => a.day_of_week)
    .sort((a, b) => a - b);

  const days: Date[] = [];
  const currentDate = new Date(dateRange.start);

  while (currentDate <= dateRange.end) {
    if (availableDaysOfWeek.includes(currentDate.getDay())) {
      days.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
}

function generateTimeSlots(
  upcomingAvailableDay: Date,
  staffAvailDay: StaffAvailabilityRow,
): GroupListItem[] {
  const effectiveStartTime = getEffectiveStartTime(staffAvailDay);
  const start = createDateWithLocalTime(upcomingAvailableDay, effectiveStartTime);
  const end = createDateWithLocalTime(upcomingAvailableDay, staffAvailDay.end_time);
  const timeSlots: GroupListItem[] = [];
  let current = new Date(start);

  while (current < end) {
    const slotId = getIDFromDateTime(current);
    // Extraer "HH:MM"
    const timeString = current.toTimeString().slice(0, 5);

    timeSlots.push({
      id: slotId,
      name: formatTime({ time24h: timeString }),
    });

    // Incrementar la duración del slot (30 minutos)
    current = new Date(current.getTime() + SCHEDULE_APPOINTMENT.MINUTES_TO_INCREASE);
  }

  return timeSlots;
}

function getEffectiveStartTime({ day_of_week, start_time }: StaffAvailabilityRow): string {
  // Calcular hora mínima en Colombia según offset. Ej. start_time = 10:30:00
  const now = nowInColombia();
  const todayDayOfWeek = now.getDay();

  if (todayDayOfWeek !== day_of_week) {
    return start_time;
  }

  const minStartTime = new Date(now);
  minStartTime.setHours(minStartTime.getHours() + SCHEDULE_APPOINTMENT.START_OFFSET_HOURS, 0, 0);
  const barberStartToday = createDateWithLocalTime(now, start_time);

  const effectiveStartDate = new Date(Math.max(minStartTime.getTime(), barberStartToday.getTime()));
  const doubleCheckDate = effectiveStartDate > now ? effectiveStartDate : now;
  const timeOnly = doubleCheckDate.toISOString().split('T')[1].substring(0, 8);
  // Posibles escenarios
  // Now	      START_OFFSET_HOURS	Hora Barbero	Resultado
  // 09:00:00	        2	            11:00:00      11:00:00
  // 15:00:00	        2	            11:00:00      17:00:00
  return timeOnly;
}

function removeBookedSlots(appointments: AppointmentRow[], allSlots: GroupListItem[]) {
  // Crear un conjunto de IDs de slots reservados
  const bookedSlotIds = new Set(appointments.map((appt) => appt.date_time.slice(0, 16)));

  // Filtrar los slots que no están reservados
  return allSlots.filter((slot) => !bookedSlotIds.has(slot.id as string));
}
