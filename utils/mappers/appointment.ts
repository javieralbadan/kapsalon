import {
  AppointmentCancel,
  AppointmentCreationType,
  AppointmentEditionType,
  AppointmentInsert,
  AppointmentRow,
  AppointmentStatus,
  AppointmentUI,
  AppointmentUpdate,
  AppointmentValidDetailsData,
  SetOptionParams,
} from '@/types/appointments';
import { formatCurrency, formatDateTime } from '../formatters';

export const mapAppointmentUI = (appointmentAPI: AppointmentRow): AppointmentUI | null => {
  if (Object.keys(appointmentAPI).length === 0) return null;

  const dateTimeFormatted = formatDateTime({ dateString: appointmentAPI.date_time });
  return {
    id: appointmentAPI.id,
    customerId: appointmentAPI.customer_id,
    dateTime: dateTimeFormatted,
    dateTimeISO: appointmentAPI.date_time,
    serviceId: appointmentAPI.service_id,
    staffMemberId: appointmentAPI.staff_member_id,
    status: appointmentAPI.status,
    ...(appointmentAPI.price_override && { priceOverride: appointmentAPI.price_override }),
    ...(appointmentAPI.rating && { rating: appointmentAPI.rating }),
  };
};

export const mapApptDetailsIntoEditionUI = ({
  customers,
  services,
  staff,
  ...appt
}: AppointmentValidDetailsData): AppointmentEditionType => {
  return {
    appt: mapAppointmentUI(appt) as AppointmentUI,
    customer: {
      id: appt.customer_id,
      firstName: customers?.first_name || '',
      lastName: customers?.last_name || '',
      fullName: `${customers?.first_name} ${customers?.last_name}` || '',
      phoneNumber: customers?.phone_number || '',
    },
    shop: staff.shops,
    barber: {
      id: appt.staff_member_id,
      name: `${staff?.first_name} ${staff?.last_name}`,
      phoneNumber: staff?.phone_number || '',
    },
    service: {
      id: appt.service_id,
      name: services?.name,
      description: formatCurrency({ value: services?.price }),
    },
    dateTime: { id: '', name: '' },
  };
};

export const mapAppointmentToInsert = (
  appointment: AppointmentCreationType,
  customerId: string,
): AppointmentInsert => {
  return {
    status: AppointmentStatus.Confirmed,
    date_time: `${appointment.dateTime.id}[America/Bogota]`,
    customer_id: customerId,
    staff_member_id: appointment.barber.id.toString(),
    service_id: appointment.service.id.toString(),
  };
};

export const mapAppointmentToUpdate = (appointment: AppointmentEditionType): AppointmentUpdate => {
  // appointment es AppointmentEditionType y contiene appt que es AppointmentUI
  // appointment.appt.dateTimeISO = original_date
  // appointment.dateTime.id = nueva fecha
  return {
    id: appointment.appt.id,
    status: AppointmentStatus.Rescheduled,
    date_time: `${appointment.dateTime.id}[America/Bogota]`,
    original_date: `${appointment.appt.dateTimeISO}[America/Bogota]`,
    updated_at: new Date().toISOString(),
  };
};

export const mapApptDateTime = (slotId: string): SetOptionParams => {
  const apptDateTime = new Date(slotId).toISOString();
  // Se usa solo el id: "2025-04-20T13:30", porque name viene en formato 12hs: "1:30 pm"
  return {
    key: 'dateTime',
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

export const mapAppointmentToCancel = (): AppointmentCancel => {
  return {
    status: AppointmentStatus.Cancelled,
    updated_at: new Date().toISOString(),
  };
};
