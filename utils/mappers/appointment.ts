import {
  AppointmentCreationType,
  AppointmentInsert,
  AppointmentStatus,
} from '@/types/appointments';
import { CustomerInsert } from '@/types/customers';
import { FormUserInfoType } from '@/types/messages';

export const mapCustomerToInsert = (customerInfo: FormUserInfoType): CustomerInsert => {
  return {
    first_name: customerInfo.firstName,
    last_name: customerInfo.lastName,
    phone_number: parseInt(customerInfo.phone),
    phone_verified: true,
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
