import {
  AppointmentCreationType,
  AppointmentInsert,
  AppointmentRow,
  AppointmentStatus,
  AppointmentUI,
  SetOptionParams,
} from '@/types/appointments';
import { formatDateTime } from '../formatters';

export const mapAppointmentUI = (appointmentAPI: AppointmentRow): AppointmentUI | null => {
  if (Object.keys(appointmentAPI).length === 0) return null;

  const dateTimeFormatted = formatDateTime({ dateString: appointmentAPI.date_time });
  return {
    id: appointmentAPI.id,
    customerId: appointmentAPI.customer_id,
    dateTime: dateTimeFormatted,
    serviceId: appointmentAPI.service_id,
    staffMemberId: appointmentAPI.staff_member_id,
    status: appointmentAPI.status,
    ...(appointmentAPI.price_override && { priceOverride: appointmentAPI.price_override }),
    ...(appointmentAPI.rating && { rating: appointmentAPI.rating }),
  };
};

export const mapAppointmentToInsert = (
  appointment: AppointmentCreationType,
  customerId: string,
): AppointmentInsert => {
  return {
    customer_id: customerId,
    service_id: appointment.service.id.toString(),
    staff_member_id: appointment.barber.id.toString(),
    date_time: `${appointment.dayTime.id}[America/Bogota]`,
    status: AppointmentStatus.Confirmed,
  };
};

export const mapApptDateTime = (slotId: string): SetOptionParams => {
  const apptDateTime = new Date(slotId).toISOString();
  // Se usa solo el id: "2025-04-20T13:30", porque name viene en formato 12hs: "1:30 pm"
  return {
    key: 'dayTime',
    listItem: {
      id: slotId,
      name: formatDateTime({ dateString: apptDateTime }),
    },
  };
};

export function setAppoinmentTimeZone(appointmentAPI: AppointmentRow): AppointmentRow {
  // From this: '2025-04-21T21:00:00+00:00' to: 2025-04-21T16:00:00+00:00
  const utcDate = new Date(appointmentAPI.date_time);
  // Colombia está en UTC-5
  const colombiaTimestamp = new Date(utcDate.getTime() - 5 * 60 * 60 * 1000);
  // Mantener el formato ISO con la zona horaria T16:00:00.000Z
  const date_time = colombiaTimestamp.toISOString().replace('.000Z', '');

  return { ...appointmentAPI, date_time };
}
