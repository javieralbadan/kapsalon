import {
  AppointmentInsert,
  AppointmentResponseType,
  AppointmentRow,
  AppointmentsResponseType,
} from '@/types/appointments';
import { supabaseClient } from '@/utils/supabase/client';

const APPOINTMENTS = 'appointments';

export const getAppointmentsFromDB = async (): Promise<AppointmentsResponseType> => {
  const { data, error } = await supabaseClient.from(APPOINTMENTS).select('*');
  if (error) {
    console.error('🔎 Error fetching appointments:', error);
    throw error;
  }
  console.log('🚀 ~ API:getAppointmentsFromDB:', data);
  return { data, error: null };
};

export const getAppointmentByIdFromDB = async (
  appointmentId: string,
): Promise<AppointmentResponseType> => {
  const { data, error } = await supabaseClient
    .from(APPOINTMENTS)
    .select('*')
    .eq('id', appointmentId);
  if (error) {
    console.error('🔎 Error fetching appointment by id:', error);
    throw error;
  }
  console.log('🚀 ~ API:getAppointmentByIdFromDB:', data[0]);
  return { data: data[0] as AppointmentRow, error: null };
};

export const createAppointmentInDB = async (
  newAppointment: AppointmentInsert,
): Promise<AppointmentsResponseType> => {
  const { data, error } = await supabaseClient.from(APPOINTMENTS).insert(newAppointment).select();
  if (error) {
    console.error('🔎 Error creating appointment:', error);
    throw error;
  }
  console.log('🚀 ~ API:createAppointmentInDB:', data);
  return { data, error: null };
};

export const updateAppointmentInDB = async (
  appointmentId: string,
  appointmentData: Partial<AppointmentInsert>,
): Promise<AppointmentResponseType> => {
  const { data, error } = await supabaseClient
    .from(APPOINTMENTS)
    .update(appointmentData)
    .eq('id', appointmentId)
    .select();
  if (error) {
    console.error('🔎 Error updating appointment:', error);
    throw error;
  }
  console.log('🚀 ~ API:updateAppointmentInDB:', data[0]);
  return { data: data[0] as AppointmentRow, error: null };
};

export const getAppointmentsByCustomerIdFromDB = async (
  customerId: string,
): Promise<AppointmentsResponseType> => {
  const { data, error } = await supabaseClient
    .from(APPOINTMENTS)
    .select('*')
    .eq('customer_id', customerId);
  if (error) {
    console.error('🔎 Error fetching appointments by customer id:', error);
    throw error;
  }
  console.log('🚀 ~ API:getAppointmentsByCustomerIdFromDB:', data);
  return { data, error: null };
};

export const getAppointmentsByServiceIdFromDB = async (
  serviceId: string,
): Promise<AppointmentsResponseType> => {
  const { data, error } = await supabaseClient
    .from(APPOINTMENTS)
    .select('*')
    .eq('service_id', serviceId);
  if (error) {
    console.error('🔎 Error fetching appointments by service id:', error);
    throw error;
  }
  console.log('🚀 ~ API:getAppointmentsByServiceIdFromDB:', data);
  return { data, error: null };
};

export const getAppointmentsByStaffMemberIdFromDB = async (
  staffMemberId: string,
): Promise<AppointmentsResponseType> => {
  const { data, error } = await supabaseClient
    .from(APPOINTMENTS)
    .select('*')
    .eq('staff_member_id', staffMemberId);
  if (error) {
    console.error('🔎 Error fetching appointments by staff member id:', error);
    throw error;
  }
  console.log('🚀 ~ API:getAppointmentsByStaffMemberIdFromDB:', data);
  return { data, error: null };
};
