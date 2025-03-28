import {
  AppointmentCreationType,
  AppointmentInsert,
  AppointmentRow,
  AppointmentStatus,
  AppointmentUI,
} from '@/types/appointments';

export const mapAppointmentUI = (appointmentAPI: AppointmentRow): AppointmentUI | null => {
  if (Object.keys(appointmentAPI).length === 0) return null;

  return {
    id: appointmentAPI.id,
    customerId: appointmentAPI.customer_id,
    dateTime: appointmentAPI.date_time,
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
    date_time: appointment.dayTime.id as string,
    status: AppointmentStatus.Confirmed,
  };
};
